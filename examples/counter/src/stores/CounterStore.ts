import { createStore } from 'stamen'

interface State {
  count: number
  name: string
}

const initialState: State = {
  count: 10,
  name: 'Counter',
}

export const { useStore, dispatch, query } = createStore({
  state: initialState,
  reducers: {
    increment(state, payload: any = 1) {
      state.count += payload
    },
    decrement(state) {
      state.count--
    },
  },
  effects: {
    async asyncIncrement() {
      await sleep(1000)
      dispatch('increment')
    },
    async asyncDecrement() {
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

export default { useStore, dispatch, query }
