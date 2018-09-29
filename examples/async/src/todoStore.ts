import { createStore } from 'stamen'

const { Consumer, mutate } = createStore({
  currentItem: {
    userId: 1,
    id: 1,
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

export { Consumer, mutate }
