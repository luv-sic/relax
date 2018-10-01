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
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`
  const json = await fetch(url).then(response => response.json())
  console.log('this:', this)
  mutate(state => {
    state.currentItem = json
  })
}

export { mutate, consume }
