import React from 'react'
import { useStore, dispatch } from 'stores/counterStore'

const Counter = () => {
  const { name, count } = useStore(S => S)
  return (
    <div className="box">
      <h2>{name}</h2>
      <div style={{ textAlign: 'center' }}>
        <div>{count}</div>
        <button onClick={() => dispatch('decrement')}>-</button>
        <button onClick={() => dispatch('increment')}>+</button>
        <br />
        <button onClick={() => dispatch('asyncDecrement')}>async-</button>
        <button onClick={() => dispatch('asyncIncrement')}>async+</button>
      </div>
    </div>
  )
}

export default Counter
