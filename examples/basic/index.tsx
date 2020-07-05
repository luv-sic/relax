import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '../../src'

const { useSelector, dispatch, Provider } = createStore({
  state: {
    count: 0,
  },
  reducers: {
    increment(state) {
      state.count++
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

const Counter = () => {
  const count = useSelector(S => S.count)
  return (
    <div>
      <span>{count}</span>
      <div>
        <button onClick={() => dispatch('decrement')}>-</button>
        <button onClick={() => dispatch('increment')}>+</button>
        <button onClick={() => dispatch('asyncIncrement')}>async+</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider initialState={{ count: 10 }}>
      <Counter />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
