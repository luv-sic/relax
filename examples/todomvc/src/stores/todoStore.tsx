import { createStore } from 'stamen'
import { SHOW_ALL } from '../constants/TodoFilters'

export interface TodoType {
  text: string
  completed: boolean
  id: number
}

interface State {
  todos: TodoType[]
  visibilityFilter: string
}

const initialState: State = {
  todos: [
    {
      text: 'Use Stamen',
      completed: false,
      id: 0,
    },
  ],
  visibilityFilter: SHOW_ALL,
}

const { consume, mutate } = createStore(initialState)

export { consume, mutate }

export function addTodo(text: string) {
  mutate(state => {
    state.todos.push({
      id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text,
    })
  })
}

export function deleteTodo(id: number) {
  mutate(state => {
    state.todos = state.todos.filter(todo => todo.id !== id)
  })
}

export function editTodo(id: number, text: string) {
  mutate(state => {
    state.todos = state.todos.map(
      todo => (todo.id === id ? { ...todo, text } : todo),
    )
  })
}

export function completeTodo(id: number) {
  mutate(state => {
    state.todos = state.todos.map(
      todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo),
    )
  })
}

export function completeAllTodos() {
  mutate(state => {
    const areAllMarked = state.todos.every(todo => todo.completed)
    state.todos = state.todos.map(todo => ({
      ...todo,
      completed: !areAllMarked,
    }))
  })
}

export function clearCompleted() {
  mutate(state => {
    state.todos = state.todos.filter(todo => todo.completed === false)
  })
}

export function setVisibilityFilter(filter: string) {
  mutate(state => {
    state.visibilityFilter = filter
  })
}
