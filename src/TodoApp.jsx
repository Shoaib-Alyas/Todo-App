import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTodoList((prev) => [...prev, newTask.trim()]);
    setNewTask("");
  };

  const removeTask = (targetIdx) => {
    setTodoList((prev) => prev.filter((_, idx) => idx !== targetIdx));
  };

  const handleEdit = (idx) => {
    setIsEditing(idx);
    setEditedTask(todoList[idx]);
  };

  const saveEdit = (idx) => {
    if (!editedTask.trim()) return;
    setTodoList((prev) =>
      prev.map((task, i) => (i === idx ? editedTask.trim() : task))
    );
    setIsEditing(null);
    setEditedTask("");
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
              {isEditing === idx ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => saveEdit(idx)}
                    className="save-button"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo}</span>
                  <button
                    onClick={() => handleEdit(idx)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTask(idx)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </>
              )}
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
