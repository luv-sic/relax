import * as React from 'react'
import TodoTextInput from './TodoTextInput'
import { dispatch } from '@stores/TodoStore'

const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        onSave={text => {
          if (text.length !== 0) {
            dispatch('addTodo', text)
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

export default Header
