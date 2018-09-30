import * as React from 'react'
import { consume, fetchTodo } from './todoStore'

class App extends React.Component {
  componentDidMount() {
    fetchTodo(1)
  }
  public render() {
    return (
      <div className="App">
        <h3>Current Todo Item: </h3>
        {consume(state => (
          <pre>{JSON.stringify(state, null, 2)}</pre>
        ))}
        <button onClick={() => fetchTodo(2)}>Get New Todo Item</button>
      </div>
    )
  }
}

export default App
