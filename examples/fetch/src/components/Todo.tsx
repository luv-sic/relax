import React from 'react'

import TodoStore from '@stores/TodoStore'
import CounterStore from '@stores/CounterStore'

const Todo = () => {
  const todoStore = TodoStore.useStore()
  const counterStore = CounterStore.useStore()

  const todo = todoStore.get(s => s.todo)
  const count = counterStore.get(s => s.count)

  const query = /* GraphQL */ `
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  React.useEffect(() => {
    // todoStore.dispatch(actions => actions.fetchTodo, 6)
    // const url = `https://jsonplaceholder.typicode.com/todos/6`
    // todoStore.fetch({ url, stateKey: 'todo' })
    todoStore.query({ query, stateKey: 'todo' })
    console.log('mounted....')
  }, [])

  console.log('render......')

  return (
    <div className="App">
      <h3>Current Todo Item: </h3>
      <div>{count}</div>

      {todo.loading && <div>loading...</div>}

      {!todo.loading && <pre>{JSON.stringify(todo.data, null, 2)}</pre>}

      <button onClick={() => todoStore.dispatch(a => a.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default Todo
