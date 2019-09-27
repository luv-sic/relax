import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'relax-ts';

const { useSelector, dispatch } = createStore({
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
      dispatch('increment')
    },
  },
})

setTimeout(async () => {
  const name =  await dispatch('setName')
  console.log('name:', name)
}, 2000)

const App = () => {
  const count = useSelector(s => s.count)
  console.log('render......')
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
      <button onClick={() => dispatch('asyncIncrement')}>async+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
