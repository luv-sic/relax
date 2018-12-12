import React, { useEffect } from 'react'
import { useMount } from 'react-use'

import todoStore from '@stores/todoStore'
import counterStore from '@stores/counterStore'
import { GET_MOVIE } from '../graphqls/getMovie'

const Count = () => {
  const { useStore, dispatch } = counterStore
  const count = useStore(s => s.count)
  useEffect(() => {
    dispatch(A => A.asyncIncrement, 12)
  }, [])
  return <div>{count}</div>
}

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
      await todoStore.query(
        GET_MOVIE,
        {
          title: 'Inception',
        },
        { stateKey: 'todo' },
      )
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className="App">
      <Count />
      <h3>Current Todo Item: </h3>
      <TodoItem />
      <button onClick={() => todoStore.dispatch(A => A.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default Todo
