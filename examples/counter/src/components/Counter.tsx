import * as React from 'react'
import { useStore } from '@stores/CounterStore'

const Counter = () => {
  const { get, dispatch } = useStore()
  const count = get(s => s.count)

  return (
    <div className="box">
      <div style={{ textAlign: 'center' }}>
        <div>{count}</div>
        <button onClick={() => dispatch(a => a.decrement)}>-</button>
        <button onClick={() => dispatch('increment')}>+</button>
        <br />
        <button onClick={() => dispatch(a => a.asyncDecrement)}>async-</button>
        <button onClick={() => dispatch(a => a.asyncIncrement)}>async+</button>
      </div>
    </div>
  )
}

export default Counter
