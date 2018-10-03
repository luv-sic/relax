import * as React from 'react'
import { dispatch, consume } from './counterStore'

const Counter = () => (
  <div className="box">
    <h2>Counter</h2>
    <div style={{ textAlign: 'center' }}>
      {consume(
        state => state.count,
        count => {
          return <div>{count}</div>
        },
      )}
      <div>
        {consume(
          state => state.name,
          name => {
            return name
          },
        )}
      </div>
      <button onClick={() => dispatch(c => c.increment)}>+</button>
      <button onClick={() => dispatch('increment', 1)}>+</button>
      <br />
      <button onClick={() => dispatch(c => c.asyncDecrement)}>async-</button>
      <button onClick={() => dispatch('asyncIncrement')}>async+</button>
    </div>
  </div>
)

export default Counter
