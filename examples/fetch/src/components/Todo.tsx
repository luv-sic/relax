import React, { useEffect } from 'react'
import { useMount } from 'react-use'

import todoStore from '@stores/todoStore'
import counterStore from '@stores/counterStore'

const Count = () => {
  const { useStore, dispatch } = counterStore
  const count = useStore(s => s.count)
  useEffect(() => {
    dispatch('increment', 1)
  }, [])
  return <div>{count}</div>
}

const TodoItem = () => {
  const { useStore } = todoStore
  const { loading, data, error } = useStore(s => s.todo)

  if (loading) return <div>loading...</div>

  if (error) {
    return (
      <div>
        <div>error!</div>
      </div>
    )
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const Todo = () => {
  useMount(async () => {
    try {
      await todoStore.query(g => g.getMovie, {
        variables: {
          title: 'Inception',
        },
        stateKey: 'todo',
      })
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className="App">
      <Count />
      <h3>Current Todo Item: </h3>
      <TodoItem />
      <button onClick={() => todoStore.dispatch(a => a.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default Todo
