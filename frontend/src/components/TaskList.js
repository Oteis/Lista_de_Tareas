import React, { useState } from "react";

function TasksList({ tasks, deleteTask, updateTask }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [edits, setEdits] = useState({});

  const toggleTaskDetails = (id) => {
    setSelectedTaskId(selectedTaskId === id ? null : id);
  };

  const handleEditChange = (event, field) => {
    setEdits({ ...edits, [field]: event.target.value });
  };

  const saveEdits = async (id) => {
    await updateTask(id, { ...edits, updatedAt: new Date() });
    setSelectedTaskId(null);
    setEdits({});
  };

  return (
    <div id="checklist">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-item ${
            task.status === "completed" ? "completed" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={(e) =>
              updateTask(task._id, {
                status: e.target.checked ? "completed" : "pending",
              })
            }
          />
          <label onClick={() => toggleTaskDetails(task._id)}>
            {task.title}
          </label>
          {selectedTaskId === task._id && (
            <div className="task-details active">
              <input
                type="text"
                value={edits.title || task.title}
                onChange={(e) => handleEditChange(e, "title")}
              />
              <textarea
                value={edits.description || task.description}
                onChange={(e) => handleEditChange(e, "description")}
              />
              <select
                value={edits.priority || task.priority}
                onChange={(e) => handleEditChange(e, "priority")}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
              <select
                value={edits.status || task.status}
                onChange={(e) => handleEditChange(e, "status")}
              >
                <option value="pending">Pendiente</option>
                <option value="in progress">En Progreso</option>
                <option value="completed">Completada</option>
                <option value="on hold">En Espera</option>
              </select>
              <div className="date-container">
                <div className="date-block">
                  <span>Creado:</span>
                  <span>{new Date(task.createdAt).toLocaleString()}</span>
                </div>
                <div className="date-block">
                  <span>Actualizado:</span>
                  <span>{new Date(task.updatedAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="button-container">
                <button
                  className="task-button"
                  onClick={() => saveEdits(task._id)}
                >
                  Guardar Cambios
                </button>
                <button
                  className="task-button"
                  onClick={() => deleteTask(task._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TasksList;
