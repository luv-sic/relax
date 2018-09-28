import * as React from 'react'
import TodoItem from './TodoItem'
import { Consumer, TodoType } from '../stores/todoStore'
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

const TodoList: React.SFC = () => (
  <ul className="todo-list">
    <Consumer>
      {({ todos, visibilityFilter }) => {
        const visibleTodos = getVisibleTodos(todos, visibilityFilter)
        return (
          <React.Fragment>
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </React.Fragment>
        )
      }}
    </Consumer>
  </ul>
)

export default TodoList
