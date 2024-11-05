const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

// Configuración de CORS antes de las rutas
app.use(
  cors({
    origin: "http://localhost:3000", // Permite solicitudes desde el origen del cliente React
  })
);

app.use(express.json()); // Middleware para parsear JSON

// Conexión a MongoDB
const MONGO_URI =
  "mongodb+srv://vitineitor:Da0lgq5mc1Ly25yp@cluster0.v5ukf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Rutas
app.get("/", (req, res) => {
  res.send(
    "Bienvenido a la API de la Lista de Tareas!\nFuturo desarrollo del frontend"
  );
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
