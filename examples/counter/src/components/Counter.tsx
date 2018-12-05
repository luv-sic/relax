import * as React from 'react'
import { useStore, dispatch } from '@stores/CounterStore'

const Counter = () => {
  const count = useStore(S => S.count)
  console.log('render...')
  return (
    <div className="box">
      <div style={{ textAlign: 'center' }}>
        <div>{count}</div>
        <div>{count}</div>
        <button onClick={() => dispatch(A => A.decrement)}>-</button>
        <button onClick={() => dispatch('increment')}>+</button>
        <br />
        <button onClick={() => dispatch(A => A.asyncDecrement)}>async-</button>
        <button onClick={() => dispatch(A => A.asyncIncrement)}>async+</button>
      </div>
    </div>
  )
}

export default Counter
