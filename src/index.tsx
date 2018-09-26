import * as React from 'react'

const Ctx = React.createContext({})
type Listener = (state?) => void

export default class Store {
  private listeners: Listener[] = []
  setState = (updater?) => {
    Object.keys(updater).forEach(key => (this[key] = updater[key]))
    setTimeout(() => {
      this.listeners.forEach(listener => listener(this))
    }, 0)
  }
  subscribe(fn: Listener) {
    this.listeners.push(fn)
    return () => {
      this.unsubscribe(fn)
    }
  }
  unsubscribe(fn: Listener) {
    const index = this.listeners.indexOf(fn)
    this.listeners.splice(index, 1)
  }
}

class Provider extends React.Component<any> {
  state: object
  unsubscribe: () => void
  constructor(props) {
    super(props)
    const { children, ...rest } = props
    this.state = { ...rest }
  }
  update = newStore => {
    this.setState({ [newStore.constructor.name]: newStore })
  }
  componentDidMount() {
    Object.keys(this.state).forEach(key => {
      this.unsubscribe = this.state[key].subscribe(this.update)
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return <Ctx.Provider value={this.state}>{this.props.children}</Ctx.Provider>
  }
}

const Consumer = props => {
  return <Ctx.Consumer>{store => props.children(store)}</Ctx.Consumer>
}

const consume: any = () => Component => props => (
  <Ctx.Consumer children={store => <Component {...props} {...store} />} />
)

export { Store, Provider, Consumer, consume }
