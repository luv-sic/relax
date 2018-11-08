import React from 'react'
import { createStore } from 'stamen'

const { useStore } = createStore({
  state: {
    count: 10,
  },
  reducers: {
    increment(state) { state.count++
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement(state) {
      state.count++
    },
  },
})

const App = () => {
  const { get, dispatch } = useStore()
  const count = get(s => s.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(a => a.decrement)}>-</button>
      <button onClick={() => dispatch(a => a.increment)}>+</button>
    </div>
  )
}

export default App
