import React from "react";
import "../styles/TodoItem.css";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  startEditing: (id: number, text: string) => void; // Add startEditing prop
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  startEditing,
}) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
      <div>
        <button
          className="edit-btn"
          onClick={() => startEditing(todo.id, todo.text)} // Trigger editing
        >
          ✎
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteTodo(todo.id)}
        >
          ✖
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
