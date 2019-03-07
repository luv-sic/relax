import React from 'react'
import { useMount } from 'react-use'

import todoStore from '@stores/todoStore'

const TodoItem = () => {
  const { useStore } = todoStore
  const { loading, data, error } = useStore(S => S.todo)

  if (loading) return <div>loading...</div>

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const Todo = () => {
  useMount(async () => {
    try {
      await todoStore.fetch('/todos/1', {
        stateKey: 'todo',
      })
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className="App">
      <h3>Current Todo Item: </h3>
      <TodoItem />
    </div>
  )
}

export default Todo
