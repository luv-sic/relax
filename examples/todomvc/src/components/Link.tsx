import * as React from 'react'
import classnames from 'classnames'
import { Consumer, setVisibilityFilter } from '../stores/todoStore'

interface LinkProp {
  filter: string
  active?: boolean
  children: React.ReactNode
}

const Link: React.SFC<LinkProp> = ({ active, children, filter }) => (
  <Consumer>
    {({ visibilityFilter }) => (
      <a
        className={classnames({ selected: filter === visibilityFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => setVisibilityFilter(filter)}
      >
        {children}
      </a>
    )}
  </Consumer>
)

export default Link
