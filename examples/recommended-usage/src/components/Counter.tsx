import * as React from 'react'
import { consume, actions } from '@stores/counterStore'

const Counter = () => (
  <div className="box">
    <h2>Counter</h2>
    <div style={{ textAlign: 'center' }}>
      <div>{consume(state => state.count)}</div>
      <button onClick={actions.decrement}>-</button>
      <button onClick={actions.increment}>+</button>
      <br />
      <button onClick={actions.asyncDecrement}>async-</button>
      <button onClick={actions.asyncIncrement}>async+</button>
    </div>
  </div>
)

export default Counter
