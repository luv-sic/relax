import * as React from 'react'

import { useStore } from './todoStore'

const App = () => {
  const { get, dispatch } = useStore()
  const currentItem = get(s => s.currentItem)

  return (
    <div className="App">
      <h3>Current Todo Item: </h3>
      <pre>{JSON.stringify(currentItem, null, 2)}</pre>
      <button onClick={() => dispatch(a => a.fetchTodo, 2)}>Get New Todo Item</button>
    </div>
  )
}

export default App
