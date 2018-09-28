import * as React from 'react'
import { Consumer, fetchTodo } from './todoStore'

class App extends React.Component {
  componentDidMount() {
    fetchTodo(1)
  }
  public render() {
    return (
      <div className="App">
        <h3>Current Todo Item: </h3>
        <Consumer>
          {store => <pre>{JSON.stringify(store.currentItem, null, 2)}</pre>}
        </Consumer>
        <button onClick={() => fetchTodo(2)}>Get New Todo Item</button>
      </div>
    )
  }
}

export default App
