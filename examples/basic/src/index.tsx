import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'stamen'
import { createStore } from './src'

const { useStore, dispatch } = createStore({
  state: {
    count: 10,
    name: 'forsigner',
  },
  reducers: {
    setName(state) {
      state.name = 'livia'
      return state.name
    },
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
      dispatch(A => A.increment)
    },
  },
})

setTimeout(async () => {
  const name =  await dispatch(A => A.setName)
  console.log('name:', name)
}, 2000)

const App = () => {
  const count = useStore(S => S.count)
  console.log('render......')
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(A => A.decrement)}>-</button>
      <button onClick={() => dispatch(A => A.increment)}>+</button>
      <button onClick={() => dispatch(A => A.asyncIncrement)}>async+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
