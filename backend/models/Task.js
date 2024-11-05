const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "on hold"],
      default: "pending",
    },
  },
  { timestamps: true } // Esto crea automáticamente createdAt y updatedAt
);

//Actualizar `updatedAt` automáticamente al guardar cambios
TaskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Task", TaskSchema);
