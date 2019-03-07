import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Todo from '@components/Todo'

import stamen from './src'

stamen.init({
  rest: {
    endpoint: 'https://jsonplaceholder.typicode.com',
  },
  graphql: {
    endpoint: 'https://jsonplaceholder.typicode.com',
  },
})

ReactDOM.render(<Todo />, document.getElementById('root') as HTMLElement)
