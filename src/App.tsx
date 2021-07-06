import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import React from 'react'
import { ToastContainer } from 'react-toastify'

import { StatusFilter } from './api'
import { Footer, Header, TodoItem } from './components'
import useTodos from './useTodos'

function App() {
  const {
    todos,
    onCreate,
    onRemove,
    onUpdate,
    onToggle,
    statusFilter,
    onStatusFilterChange,
    isLoadingData,
  } = useTodos()
  const statusFilterOptions = [
    {
      value: StatusFilter.All,
      text: 'All',
    },
    {
      value: StatusFilter.UNCOMPLETED,
      text: 'Uncompleted',
    },
    {
      value: StatusFilter.COMPLETED,
      text: 'Completed',
    },
  ]

  return (
    <div className={`todo-app ${isLoadingData ? 'todo-app-loading' : ''}`}>
      <Header onCreate={onCreate} />
      <div className="todo-count-filter">
        <div className="todo-count">
          {todos.length === 0 ? 'None' : `${todos.length} items left`}
        </div>
        <div className="todo-filter">
          {statusFilterOptions.map((sfo) => (
            <div
              key={sfo.value}
              className={`todo-filter-item ${
                sfo.value === statusFilter ? 'todo-filter-item__actived' : ''
              }`}
              onClick={() => onStatusFilterChange(sfo.value)}
            >
              {sfo.text}
            </div>
          ))}
        </div>
      </div>
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
      <ToastContainer />
    </div>
  )
}

export default App
