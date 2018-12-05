import React from 'react'

import Profile from './Profile'
import Counter from './Counter'
import Posts from './Posts'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Profile />
        <Counter />
        <Posts />
      </div>
    )
  }
}

export default App
