import React, { FC } from 'react'

import { Todo } from '../useTodos'

export interface ITodoItemProps {
  todo: Todo
}

export const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'todo-item__completed' : ''}`}>
      <div className="todo-item--toggle">
        <input className="todo-item--toggle-input" type="checkbox" checked={todo.completed} />
      </div>
      <div className="todo-item--content">{todo.title}</div>
      <button className="todo-item--remove" title="Click to remove" />
    </div>
  )
}
