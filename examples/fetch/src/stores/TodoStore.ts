// import { createStore } from 'stamen'
import { createStore, Result } from './stamen'

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

const todoStore = createStore({
  name: 'todoStore',
  state: initialState,
  endpoint: {
    graphql: '',
    rest: '',
  },
  reducers: {
    updateTodo(state, payload) {
      state.todo = payload
    },
  },
  effects: {
    async fetchTodo(dispatch, payload) {
      dispatch('updateTodo', {
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

export default todoStore
