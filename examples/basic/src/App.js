import React from 'react'
import { createStore } from 'stamen'

const CounterStore = createStore({
  state: {
    count: 10,
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
    async asyncIncrement(state) {
      state.count++
    },
  },
})

const App = () => {
  const { get, dispatch } = CounterStore.useStore()
  const count = get(s => s.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}

export default App
