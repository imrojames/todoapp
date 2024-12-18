import React, { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null); // Track the editing task

  const addOrSaveTodo = () => {
    if (input.trim() === "") return;

    if (editingId !== null) {
      // Save the updated task
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: input } : todo
        )
      );
      setEditingId(null); // Exit editing mode
    } else {
      // Add a new task
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    }

    setInput(""); // Clear the input field
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setInput(text); // Populate the input field with the task's text
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addOrSaveTodo}>
            {editingId !== null ? "Save" : "Add"}
          </button>
        </div>
      </header>
      <main>
        {todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                startEditing={startEditing} // Pass startEditing function
              />
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks yet. Add something to get started!</p>
        )}
      </main>
    </div>
  );
};

export default App;
