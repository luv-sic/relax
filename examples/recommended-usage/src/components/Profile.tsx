import * as React from 'react'
import ProfileStore from '@stores/ProfileStore'

const Counter = () => {
  const { get, dispatch } = ProfileStore.useStore()
  const user = get(s => s)

  return (
    <div className="box profile">
      <h2>Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => dispatch(a => a.updateName)}>update name</button>
      <button onClick={() => dispatch(a => a.reset)}>restore</button>
    </div>
  )
}

export default Counter
