import React, { useState } from "react";
import "./../styles/App.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (!text) return;
    const newTask = { task: text, id: uuidv4(), isEditing: false };
    setTodos([...todos, newTask]);
    setText("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const enableEdit = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: true } : todo)));
  };

  const saveTask = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task: newText, isEditing: false } : todo)));
  };

  return (
    <div>
      <h1>To Do List</h1>
      <div className="add_tasks_section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="tasks_section">
        {todos.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="task">
                {todo.isEditing ? (
                  <>
                    <textarea
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
                    <button className="edit" onClick={() => enableEdit(todo.id)}>Edit</button>
                    <button className="delete" onClick={() => deleteTask(todo.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
