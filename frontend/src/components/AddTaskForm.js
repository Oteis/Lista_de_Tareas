import React, { useState } from "react";

function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) return;
    addTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Añadir nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

export default AddTaskForm;
