import React, { useState } from 'react'
import { Todo } from '@/store/todoStore';

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onEdit: (text: string) => void
  onDelete: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    onEdit(editText)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={`cursor-pointer ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 focus:outline-none"
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem

