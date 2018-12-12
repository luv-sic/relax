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

export const { useStore, dispatch } = createStore({
  state: initialState,
  reducers: {
    addTodo(state, text: string) {
      state.todos.push({
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text,
      })
    },
    deleteTodo(state, id: number) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },

    editTodo(state, { id, text }) {
      state.todos = state.todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    },

    completeTodo(state, id: number) {
      state.todos = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      )
    },

    completeAllTodos(state) {
      const areAllMarked = state.todos.every(todo => todo.completed)
      state.todos = state.todos.map(todo => ({
        ...todo,
        completed: !areAllMarked,
      }))
    },

    clearCompleted(state) {
      state.todos = state.todos.filter(todo => todo.completed === false)
    },
    setVisibilityFilter(state, filter: string) {
      state.visibilityFilter = filter
    },
  },
  effects: {},
})

export default { useStore, dispatch }
