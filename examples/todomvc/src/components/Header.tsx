import * as React from 'react'
import TodoTextInput from './TodoTextInput'
import TodoStore from '@stores/TodoStore'

const Header = () => {
  const { dispatch } = TodoStore.useStore()
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
