import * as React from 'react'
import Header from './Header'
import MainSection from './MainSection'
import { Provider, initialState } from '../stores/todoStore'

const App = () => (
  <Provider initialState={initialState}>
    <div>
      <Header />
      <MainSection />
    </div>
  </Provider>
)

export default App
