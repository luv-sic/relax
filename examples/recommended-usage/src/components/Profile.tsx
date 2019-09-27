import * as React from 'react'
import { useSelector, dispatch } from '../stores/profileStore'

const Counter = () => {
  const user = useSelector(S => S)

  return (
    <div className="box profile">
      <h2>Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => dispatch('updateName')}>update name</button>
      <button onClick={() => dispatch('reset')}>restore</button>
    </div>
  )
}

export default Counter
