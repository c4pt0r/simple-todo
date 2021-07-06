import React, { FC, useCallback, useState } from 'react'

import { Todo, TodoIDs } from '../useTodos'

export interface ITodoItemProps {
  todo: Todo
  onRemove: (target: TodoIDs) => void
  onToggle: (target: TodoIDs) => void
  onUpdate: (target: TodoIDs & { title: string }) => void
}

export const TodoItem: FC<ITodoItemProps> = ({ todo, onRemove, onUpdate, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingTitle, setEditingTitle] = useState(todo.title)

  const handleRemove = useCallback(() => {
    onRemove({ id: todo.id, clientID: todo.clientID || 0 })
  }, [todo, onRemove])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
    setEditingTitle(todo.title)
  }, [todo])

  const handleSubmit = useCallback(() => {
    const editingStr = editingTitle.trim()
    if (editingStr) {
      onUpdate({ id: todo.id, clientID: todo.clientID || 0, title: editingStr })
      setIsEditing(false)
    } else {
      onRemove({ id: todo.id, clientID: todo.clientID || 0 })
    }
  }, [editingTitle, onUpdate, todo, onRemove])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setEditingTitle(event.target.value || '')
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setEditingTitle(todo.title)
        setIsEditing(false)
      } else if (event.key === 'Enter') {
        handleSubmit()
      }
    },
    [todo, handleSubmit]
  )

  const handleStatusChange = useCallback(() => {
    onToggle({ id: todo.id, clientID: todo.clientID || 0 })
  }, [todo, onToggle])

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item__completed' : ''}`}>
      <div className="todo-item--toggle">
        <input
          className="todo-item--toggle-input"
          type="checkbox"
          checked={todo.completed}
          onChange={handleStatusChange}
          disabled={isEditing}
        />
      </div>
      {isEditing ? (
        <input
          type="text"
          className="todo-item--editing-input"
          value={editingTitle}
          onBlur={handleSubmit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="todo-item--content" onDoubleClick={handleEdit}>
          {todo.title}
        </div>
      )}
      <button
        className="todo-item--remove"
        title="Click to remove"
        onClick={handleRemove}
        disabled={isEditing}
      />
    </div>
  )
}
