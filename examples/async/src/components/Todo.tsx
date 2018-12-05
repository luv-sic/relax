import * as React from 'react'

import { useStore, dispatch } from '@stores/TodoStore'

const Todo = () => {
  const currentItem = useStore(S => S.currentItem)

  return (
    <div className="App">
      <h3>Current Todo Item: </h3>
      <pre>{JSON.stringify(currentItem, null, 2)}</pre>
      <button onClick={() => dispatch(A => A.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default Todo
