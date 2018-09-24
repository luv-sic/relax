import React from 'react'
import { inject } from 'stamen'
import counterStore from './counterStore'

const Counter = ({ counterStore }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{counterStore.state.count}</h3>
      <button onClick={() => counterStore.decrement()}>-</button>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.incrementAsync()}>+ Async</button>
    </div>
  )
}

export default inject(counterStore)(Counter)
