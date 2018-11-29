import { createStore } from './stamen'

const CounterStore = createStore({
  state: {
    count: 10,
    name: 'Counter',
  },
  reducers: {
    increment(state, payload: any = 1) {
      state.count += payload
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement(dispatch) {
      await sleep(1000)
      dispatch('increment')
    },
    async asyncDecrement(dispatch) {
      await sleep(1000)
      dispatch('decrement', 1)
    },
  },
})

function sleep(time: number) {
  return new Promise(resove => {
    setTimeout(() => {
      resove()
    }, time)
  })
}

export default CounterStore
