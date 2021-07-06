import { useState } from 'react'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

// TEMP: mock todos
const mockTodos = [
  {
    id: 'todo-1',
    title: 'Bug Fix: balabala',
    completed: false,
  },
  {
    id: 'todo-2',
    title: 'Create something with long content xxxxxyyyyyyzzzzzzzhhhhhhhh, it will break down the style?',
    completed: true,
  },
];

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)

  return {
    todos,
  }
}

export default useTodos
