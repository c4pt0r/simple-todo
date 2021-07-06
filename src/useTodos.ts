import { useState, useCallback } from 'react'


let autoClientID = 1;

export interface Todo {
  id: string
  title: string
  completed: boolean
  clientID?: number
}

export interface TodoIDs {
  id: string
  clientID?: number
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

function findTodoById(target: TodoIDs, todos: Todo[]) {
  let index = -1
  if (target.id) {
    index = todos.findIndex(t => t.id === target.id)
  } else if (target.clientID) {
    index = todos.findIndex(t => t.clientID === target.clientID)
  }
  return index
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)

  const onCreate = useCallback((title: string) => {
    const thisClientId = ++autoClientID
    setTodos([
      {
        id: '',
        title,
        completed: false,
        clientID: thisClientId,
      },
      ...todos,
    ])
    // TODO: request api to insert
    // update todo (id) with response
  }, [todos]);

  const onRemove = useCallback((target: TodoIDs) => {
    const index = findTodoById(target, todos)

    if (index >= 0) {
      const newTodos = [...todos]
      const deletedTodo = newTodos.splice(index, 1)

      setTodos(newTodos)

      if (deletedTodo[0] && deletedTodo[0].id) {
        // TODO: request api to remove
      }
    }
  }, [todos])

  const onUpdate = useCallback((target: TodoIDs & { title: string }) => {
    const index = findTodoById(target, todos)
    if (index >= 0) {
      const newTodos = [...todos]
      newTodos[index].title = target.title

      setTodos(newTodos)

      if (newTodos[index].id) {
        // TODO: request api to update title
      }
    }
  }, [todos])

  const onToggle = useCallback((target: TodoIDs) => {
    const index = findTodoById(target, todos)
    if (index >= 0) {
      const newTodos = [...todos]
      newTodos[index].completed = !newTodos[index].completed

      setTodos(newTodos)

      if (newTodos[index].id) {
        // TODO: request api to update status
      }
    }
  }, [todos])

  return {
    todos,
    onCreate,
    onRemove,
    onUpdate,
    onToggle,
  }
}

export default useTodos
