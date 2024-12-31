import React, { useState } from "react";
import "./../styles/App.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  // Add a new task
  const addTask = () => {
    if (!text) return;
    const newTask = { task: text, id: uuidv4(), isEditing: false };
    setTodos([...todos, newTask]);
    setText("");
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Enable edit mode for a task
  const enableEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Save the edited task
  const saveTask = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: newText, isEditing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>To Do List</h1>
     
      {/* Add Task Section */}
      <div className="add_tasks_section">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button className="add" onClick={addTask}>Add</button>
      </div>

      {/* Tasks Section */}
      <div className="tasks_section">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="task">
              {todo.isEditing ? (
                <>
                  <input
                    type="text"
                    defaultValue={todo.task}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    className="save"
                    onClick={() => saveTask(todo.id, text)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.task}</span>
                  <button
                    className="edit"
                    onClick={() => enableEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
