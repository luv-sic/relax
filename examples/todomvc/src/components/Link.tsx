import * as React from 'react'
import classnames from 'classnames'
import { useSelector, dispatch } from '../stores/todoStore'

interface LinkProp {
  filter: string
  active?: boolean
  children: React.ReactNode
}

const Link: React.SFC<LinkProp> = ({ active, children, filter }) => {
  const visibilityFilter = useSelector(s => s.visibilityFilter)
  return (
    <React.Fragment>
      <a
        className={classnames({ selected: filter === visibilityFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch.setVisibilityFilter(filter)}
      >
        {children}
      </a>
    </React.Fragment>
  )
}

export default Link
