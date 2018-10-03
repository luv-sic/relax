import { createStore } from './stamen'

const { consume, dispatch } = createStore({
  name: 'TodoStore',
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
    async asyncIncrement(put) {
      await sleep(2000)
      put('increment')
    },
    async asyncDecrement(act) {
      await sleep(2000)
      act('decrement', 1)
    },
  },
})

// actions.decrement()
// actions.decrement()

function sleep(time: number) {
  return new Promise(resove => {
    setTimeout(() => {
      resove()
    }, time)
  })
}

export { consume, dispatch }
