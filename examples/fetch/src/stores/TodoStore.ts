import { createStore, Result } from '../src'

interface TodoItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface State {
  todo: Result<Partial<TodoItem>>
}

const initialState: State = {
  todo: {
    loading: false,
    error: null,
    data: {},
  },
}

const { useStore, dispatch, query } = createStore({
  state: initialState,
  reducers: {
    updateTodo(state, payload) {
      state.todo = payload
    },
  },
  effects: {
    async fetchTodo(payload) {
      dispatch(A => A.updateTodo, {
        loading: true,
        data: {},
      })

      const url = `https://jsonplaceholder.typicode.com/todos/${payload}`
      const data = await fetch(url).then(response => response.json())

      dispatch('updateTodo', {
        loading: false,
        data,
      })
    },
  },
})

export default { useStore, dispatch, query }
export { useStore, dispatch, query }
