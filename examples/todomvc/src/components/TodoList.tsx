import * as React from 'react'
import TodoItem from './TodoItem'
import { TodoType, useStore } from '@stores/TodoStore'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

function getVisibleTodos(todos: TodoType[], visibilityFilter: string) {
  let visibleTodos: TodoType[]
  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos
      break
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed)
      break
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed)
      break
    default:
      visibleTodos = todos
  }
  return visibleTodos
}

const TodoList: React.SFC = () => {
  const { todos, visibilityFilter } = useStore(S => S)

  const visibleTodos = getVisibleTodos(todos, visibilityFilter)

  return (
    <ul className="todo-list">
      <React.Fragment>
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </React.Fragment>
    </ul>
  )
}

export default TodoList
