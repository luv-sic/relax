import { Store } from 'stamen'

class CounterStore extends Store {
  state = {
    count: 0,
  }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  decrement() {
    this.setState({ count: this.state.count - 1 })
  }

  incrementAsync() {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }
}

export default new CounterStore()
