import { createStore } from 'stamen'

const todoStore = createStore({
  name: 'todoStore',
  state: {
    currentItem: {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
  },
  reducers: {
    updateTodo(state, payload) {
      state.currentItem = payload
    },
  },
  effects: {
    async fetchTodo(dispatch, payload) {
      const url = `https://jsonplaceholder.typicode.com/todos/${payload}`
      const data = await fetch(url).then(response => response.json())
      dispatch('updateTodo', data)
    },
  },
})

export default todoStore
