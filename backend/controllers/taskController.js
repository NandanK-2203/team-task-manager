const Task = require("../models/taskModel");

// Create Task
const createTask = async (req, res) => {
  const { title } = req.body;

  const task = await Task.create({
    title,
    user: req.user._id,
  });

  res.status(201).json(task);
};

// Get Tasks (ONLY logged-in user)
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Update Task Status
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    task.status = req.body.status || task.status;
    const updated = await task.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
