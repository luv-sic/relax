import React, { Component } from 'react'

interface Props {
  name?: string
}

class Hello extends Component<Props> {
  static defaultProps = {
    name: 'bar',
  }

  render() {
    const { name } = this.props
    return <div>hello {name}</div>
  }
}

export default Hello
