import * as React from 'react'
import { consume, actions } from '@stores/profileStore'

const Counter = () => (
  <div className="box profile">
    <h2>Profile</h2>
    {consume(state => (
      <pre>{JSON.stringify(state, null, 2)}</pre>
    ))}
    <button onClick={actions.updateName}>update name</button>
    <button onClick={actions.reset}>restore</button>
  </div>
)

export default Counter
