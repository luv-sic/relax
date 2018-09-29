import React from 'react'
import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({ count: 1 })

const App = () => (
  <div>
    <Consumer>{state => <span>{state.count}</span>}</Consumer>
    <button onClick={() => mutate(state => state.count--)}>-</button>
    <button onClick={() => mutate(state => state.count++)}>+</button>
  </div>
)

export default App
