import { createStore } from 'stamen'

const { consume, mutate } = createStore({
  currentItem: {
    id: 1,
    userId: 1,
    title: 'delectus aut autem',
    completed: false,
  },
})

export async function fetchTodo(id: number) {
  const json = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  ).then(response => response.json())

  mutate(state => {
    state.currentItem = json
  })
}

export { mutate, consume }
