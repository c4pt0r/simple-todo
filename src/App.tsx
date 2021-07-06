import './App.css'

import React from 'react'

import { Footer, Header, TodoItem } from './components'
import useTodos from './useTodos'

function App() {
  const { todos, onCreate, onRemove, onUpdate, onToggle } = useTodos()

  return (
    <div className="todo-app">
      <Header onCreate={onCreate} />
      <div className="todo-main">
        <div className="todo-list">
          {todos.map((t) => (
            <TodoItem
              key={t.id || t.clientID}
              todo={t}
              onRemove={onRemove}
              onUpdate={onUpdate}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
