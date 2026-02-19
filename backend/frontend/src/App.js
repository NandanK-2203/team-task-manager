import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUserName(localStorage.getItem("userName"));
      loadTasks();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      setTasks([]);
    }
  }, [token]);

  const createTask = async () => {
    if (!title.trim()) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    loadTasks();
  };

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const updateStatus = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "Pending"
        ? "In Progress"
        : currentStatus === "In Progress"
        ? "Completed"
        : "Pending";

    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status: nextStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTasks();
  };

  const logoutHandler = () => {
    setToken("");
  };

  return (
    <div className="container">
      <h2>Team Task Manager</h2>

      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <div style={{ marginBottom: 20 }}>
            <strong>Welcome, {userName} 👋</strong>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>

          <h3>Create Task</h3>
          <input
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="primary-btn" onClick={createTask}>
            Add Task
          </button>

          <h3 style={{ marginTop: 25 }}>Your Tasks</h3>

          {tasks.length === 0 && <p>No tasks yet.</p>}

          {tasks.map((t) => (
            <div key={t._id} className="task-item">
              <div>
                <strong>{t.title}</strong>
                <br />
                <small>{t.status}</small>
              </div>

              <div className="task-buttons">
                <button
                  className="primary-btn"
                  onClick={() => updateStatus(t._id, t.status)}
                >
                  Update
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
