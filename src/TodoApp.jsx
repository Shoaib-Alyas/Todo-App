import React, { useState } from "react";
import "./App.css"; 

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTodoList((prev) => [...prev, newTask.trim()]);
    setNewTask("");
  };

  const removeTask = (targetIdx) => {
    setTodoList((prev) => prev.filter((_, idx) => idx !== targetIdx));
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="input"
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>

      {todoList.length > 0 ? (
        <ul className="task-list">
          {todoList.map((todo, idx) => (
            <li key={`${todo}-${idx}`} className="task-item">
              <span>{todo}</span>
              <button
                onClick={() => removeTask(idx)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">No tasks yet..Add one above!</p>
      )}
    </div>
  );
};

export default App;
