import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'stamen'

const { useStore, dispatch } = createStore({
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
    async asyncIncrement() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      dispatch("increment")
    },
  },
})

const App = () => {
  const count = useStore(S => S.count)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch(S => S.increment)}>+</button>
      <button onClick={() => dispatch('asyncIncrement')}>async+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
