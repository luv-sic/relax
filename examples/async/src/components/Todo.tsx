import * as React from 'react'

import TodoStore from '@stores/TodoStore'

const Todo = () => {
  const todoStore = TodoStore.useStore()
  const currentItem = todoStore.get(s => s.currentItem)

  return (
    <div className="App">
      <h3>Current Todo Item: </h3>
      <pre>{JSON.stringify(currentItem, null, 2)}</pre>
      <button onClick={() => todoStore.dispatch(a => a.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default Todo
