import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Todo from '@components/Todo'

import stamen from './src'

stamen.init({
  graphql: {
    endpoint: 'https://api.graph.cool/simple/v1/movies',
    headers: {},
  },
})

ReactDOM.render(<Todo />, document.getElementById('root') as HTMLElement)
