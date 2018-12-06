import React from 'react'
// import renderer from 'react-test-renderer'
import { createStore } from '../src/index'

test('useStore', () => {
  const { useStore, dispatch } = createStore({
    state: {
      count: 1,
      name: 'Counter',
    },
    reducers: {
      increment(state, payload: any = 1) {
        state.count += payload
      },
      decrement(state) {
        state.count--
      },
    },
    effects: {
      async asyncIncrement() {
        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
        dispatch('increment')
      },
    },
  })
  const App = () => {
    const count = useStore(S => S.count)

    return <span>{count}</span>
  }

  console.log(<App />)

  // const component = renderer.create(<App />)
  // expect(component.toJSON()).toBe('1')
})
