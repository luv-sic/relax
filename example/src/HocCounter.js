import React from 'react'
import { consume } from 'stamen'

const Counter = ({ counterStore }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h3>100</h3>
        <h3>{counterStore.count}</h3>
        <button onClick={() => counterStore.decrement()}>-</button>
        <button onClick={() => counterStore.increment()}>+</button>
        <button onClick={() => counterStore.incrementAsync()}>+ Async</button>
      </div>
    </div>
  )
}

export default consume()(Counter)
