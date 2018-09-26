import React from 'react'
import { Consumer } from 'stamen'

const Counter = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Consumer select={store => store}>
        {({ counterStore }) => (
          <div>
            <h3>100</h3>
            <h3>{counterStore.count}</h3>
            <button onClick={() => counterStore.decrement()}>-</button>
            <button onClick={() => counterStore.increment()}>+</button>
            <button onClick={() => counterStore.incrementAsync()}>
              + Async
            </button>
          </div>
        )}
      </Consumer>
    </div>
  )
}

export default Counter
