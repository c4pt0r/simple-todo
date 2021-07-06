import React, { FC, useCallback, useRef } from 'react'

interface IHeaderProps {
  onCreate: (title: string) => void;
}

export const Header: FC<IHeaderProps> = ({ onCreate }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleInputKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return
    }
    event.preventDefault()

    const inputEl = inputRef.current
    if (inputEl && inputEl.value.trim()) {
      onCreate(inputEl.value.trim())
      inputEl.value = ''
    }
  }, [onCreate])

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={inputRef}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        onKeyDown={handleInputKeyDown}
      />
    </header>
  )
}
