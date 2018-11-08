import { createStore } from 'stamen'

const { useStore } = createStore({
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
    async fetchTodo(put, payload) {
      const url = `https://jsonplaceholder.typicode.com/todos/${payload}`
      const json = await fetch(url).then(response => response.json())
      put('updateTodo', json)
    },
  },
})

export { useStore }
