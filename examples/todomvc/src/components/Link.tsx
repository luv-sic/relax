import * as React from 'react'
import classnames from 'classnames'
import TodoStore from '@stores/TodoStore'

interface LinkProp {
  filter: string
  active?: boolean
  children: React.ReactNode
}

const Link: React.SFC<LinkProp> = ({ active, children, filter }) => {
  const { get, dispatch } = TodoStore.useStore()
  const visibilityFilter = get(s => s.visibilityFilter)
  return (
    <React.Fragment>
      <a
        className={classnames({ selected: filter === visibilityFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch('setVisibilityFilter', filter)}
      >
        {children}
      </a>
    </React.Fragment>
  )
}

export default Link
