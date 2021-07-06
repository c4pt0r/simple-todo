import './App.css'

import React from 'react'

import { Footer, Header, TodoItem } from './components'
import useTodos from './useTodos'

function App() {
  const { todos } = useTodos()

  return (
    <div className="todo-app">
      <Header />
      <div className="todo-main">
        <div className="todo-list">
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
