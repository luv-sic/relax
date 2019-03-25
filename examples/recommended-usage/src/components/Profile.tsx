import * as React from 'react'
import { useStore, dispatch } from 'stores/profileStore'

const Counter = () => {
  const user = useStore(S => S)

  return (
    <div className="box profile">
      <h2>Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => dispatch(A => A.updateName)}>update name</button>
      <button onClick={() => dispatch(A => A.reset)}>restore</button>
    </div>
  )
}

export default Counter
