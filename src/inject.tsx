import * as React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function inject(...stores: object[]) {
  return function wrapWithConnect(WrappedComponent): React.ReactNode {
    interface HocProps {
      [propName: string]: number
    }

    return class Connect extends React.Component<HocProps> {
      static displayName = `Connect(${getDisplayName(WrappedComponent)})`

      state = {
        store: {},
      }

      stores: any
      unmounted: boolean = false
      instances: any[]
      unsubscribe: any

      constructor(props, context) {
        super(props, context)
        this.stores = this.createStores(stores)
      }

      createStores = Stores => {
        const instances = {}
        Stores.forEach(store => {
          const { name } = store.constructor
          const key = this.firstLowerCase(name)
          instances[key] = store
        })
        return instances
      }

      listener = () => {
        if (!this.unmounted) {
          this.setState({ store: this.stores })
        }
      }

      firstLowerCase(str: string): string {
        return str.replace(/^[A-Z]/g, L => L.toLowerCase())
      }

      componentDidMount() {
        if (stores) {
          Object.keys(this.stores).forEach(key => {
            this.unsubscribe = this.stores[key].subscribe(this.listener)
          })
          this.listener()
        }
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const props = {
          ...this.props,
          ...this.state.store,
        }

        if (!Object.keys(this.state.store).length) return null
        return <WrappedComponent {...props} />
      }
    }
  }
}
