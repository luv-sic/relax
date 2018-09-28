import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({
  currentItem: {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
})

export function fetchTodo(id: number) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json())
    .then(json => {
      mutate(state => {
        state.currentItem = json
      })
    })
}

export { Consumer, mutate }
