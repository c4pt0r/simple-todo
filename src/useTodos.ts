import { useState, useCallback, useEffect } from 'react'
import { StatusFilter, getTodos, delTodo, patchTodo, postTodo } from './api'


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
  const [todos, setTodos] = useState<Todo[]>([])
  const [statusFilter, setStatusFilter] = useState(StatusFilter.All)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const fetchTodos = useCallback(async (statusFilter = StatusFilter.All, limit = 100) => {
    setIsLoadingData(true)
    try {
      const data = await getTodos({ limit, statusFilter })
      setTodos(data || [])
    } finally {
      setIsLoadingData(false)
    }
  }, [])

  useEffect(() => {
    fetchTodos(statusFilter)
  }, []) // eslint-disable-line

  const onStatusFilterChange = useCallback((val: StatusFilter) => {
    if (statusFilter !== val) {
      setStatusFilter(val)
      fetchTodos(val)
    }
  }, [statusFilter, fetchTodos])

  const onCreate = useCallback(async (title: string) => {
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
    const todoEnity = await postTodo({ title })
    if (todoEnity) {
      const { id } = todoEnity as Todo
      const todoItemIndex = todos.findIndex(t => t.clientID === thisClientId)
      if (todoItemIndex >= 0) {
        const newTodos = [...todos]
        newTodos[todoItemIndex].id = id
        setTodos(newTodos)
      }
    }
    // TODO: if error, remove the task
  }, [todos]);

  const onRemove = useCallback((target: TodoIDs) => {
    const index = findTodoById(target, todos)

    if (index >= 0) {
      const newTodos = [...todos]
      const deletedTodo = newTodos.splice(index, 1)

      setTodos(newTodos)

      if (deletedTodo[0] && deletedTodo[0].id) {
        delTodo({ id: deletedTodo[0].id })
        // TODO: if error, recover the task
      }
    }
  }, [todos])

  const onUpdate = useCallback(async (target: TodoIDs & { title: string }) => {
    const index = findTodoById(target, todos)
    if (index >= 0) {
      const newTodos = [...todos]
      newTodos[index].title = target.title

      setTodos(newTodos)

      if (newTodos[index].id) {
        patchTodo({ id: newTodos[index].id, title: target.title })
        // TODO: if error, recover the task title
      }
    }
  }, [todos])

  const onToggle = useCallback((target: TodoIDs) => {
    const index = findTodoById(target, todos)
    if (index >= 0) {
      const newTodos = [...todos]
      const newCompleted = !newTodos[index].completed
      newTodos[index].completed = newCompleted

      setTodos(newTodos)

      if (newTodos[index].id) {
        patchTodo({ id: newTodos[index].id, completed: newCompleted })
        // TODO: if error, recover the task status
      }
    }
  }, [todos])

  return {
    todos,
    onCreate,
    onRemove,
    onUpdate,
    onToggle,
    onStatusFilterChange,
    isLoadingData,
    statusFilter,
  }
}

export default useTodos
