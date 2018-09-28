import * as React from 'react'
import Footer from './Footer'
import TodoList from './TodoList'

import { Consumer, completeAllTodos, clearCompleted } from '../stores/todoStore'

const MainSection = () => (
  <section className="main">
    <Consumer>
      {({ todos }) => {
        const todosCount = todos.length
        const completedCount = todos.filter(todo => todo.completed).length
        return (
          <React.Fragment>
            {!!todosCount && (
              <span>
                <input className="toggle-all" type="checkbox" />
                <label onClick={completeAllTodos} />
              </span>
            )}
            <TodoList />
            {!!todosCount && (
              <Footer
                completedCount={completedCount}
                activeCount={todosCount - completedCount}
                onClearCompleted={clearCompleted}
              />
            )}
          </React.Fragment>
        )
      }}
    </Consumer>
  </section>
)

export default MainSection
