import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskForm from "./components/AddTaskForm";
import TasksList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const addTask = async (newTask) => {
    const response = await axios.post("http://localhost:5000/tasks", newTask);
    setTasks([...tasks, response.data]); // Asume que el servidor devuelve la tarea creada
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await axios.patch(`http://localhost:5000/tasks/${id}`, updates);
    fetchTasks();
  };

  return (
    <div className="main-container">
      <h1>GESTION DE TAREAS</h1>
      <AddTaskForm addTask={addTask} />
      <TasksList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default App;
