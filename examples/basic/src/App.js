import React from 'react'
import { createStore } from 'stamen'

const { consume, mutate } = createStore({ count: 1 })

const App = () => (
  <div>
    <span>{consume(state =>  <span>{state.count}</span>)}</span>
    <button onClick={() => mutate(state => state.count--)}>-</button>
    <button onClick={() => mutate(state => state.count++)}>+</button>
  </div>
)

export default App
