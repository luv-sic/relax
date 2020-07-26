import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '../../src'

const { useSelector, dispatch, Provider } = createStore({
  state: {
    count: 0,
  },
  actions: {
    increment(state, payload: number) {
      state.count += payload;
    },
    decrement(state, payload: number) {
      state.count -= payload;
    },
    async asyncIncrement(state, payload: number) {
      await new Promise(resolve => {
        setTimeout(() => {
          state.count += payload;
          resolve()
        }, 1000)
      })
      dispatch.increment(payload);
    },
  }
})

const Counter = () => {
  const count = useSelector(S => S.count)
  return (
    <div>
      <span>{count}</span>
      <div>
        <button onClick={() => dispatch.decrement(1)}>-</button>
        <button onClick={() => dispatch.increment(1)}>+</button>
        <button onClick={() => dispatch.asyncIncrement(1)}>async+</button>
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
