import * as React from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { dispatch } from '@stores/TodoStore'

interface Props {
  todo: object | any // TODO
}

const TodoItem: React.SFC<Props> = props => {
  const USE_STATE = 'useState'
  const useState = React[USE_STATE]
  const [editing, setState] = useState(false)
  const { todo } = props

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      dispatch('deleteTodo', id)
    } else {
      dispatch('editTodo', { id, text })
    }
    setState(false)
  }

  const handleDoubleClick = () => {
    setState(true)
  }

  let element

  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={this.state.editing}
        onSave={text => handleSave(todo.id, text)}
      />
    )
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch('completeTodo', todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => dispatch('deleteTodo', todo.id)} />
      </div>
    )
  }
  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing,
      })}
    >
      {element}
    </li>
  )
}

export default TodoItem
