import * as React from 'react'
import classnames from 'classnames'
import { consume, setVisibilityFilter } from '../stores/todoStore'

interface LinkProp {
  filter: string
  active?: boolean
  children: React.ReactNode
}

const Link: React.SFC<LinkProp> = ({ active, children, filter }) => (
  <React.Fragment>
    {consume(({ visibilityFilter }) => (
      <a
        className={classnames({ selected: filter === visibilityFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => setVisibilityFilter(filter)}
      >
        {children}
      </a>
    ))}
  </React.Fragment>
)

export default Link
