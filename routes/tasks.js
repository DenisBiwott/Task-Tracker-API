const Router = require('express');
const express = require('express');
const tasks = require('../Tasks');
const routes = express(Router());
const Task = require('../models/task');
const { update } = require('../models/task');

// GET everything
routes.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request - Add a new task
routes.post('/', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT, GET and DELETE routes
routes
  .route('/:id')
  .get(getTaskFromID, (req, res) => {
    res.status(200).json(res.task);
  })
  .patch(getTaskFromID, async (req, res) => {
    let task = res.task;

    task.text = req.body.text ? req.body.text : task.text;
    task.date = req.body.date ? req.body.date : task.date;
    task.reminder = req.body.reminder ? req.body.reminder : task.reminder;

    try {
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .delete(getTaskFromID, async (req, res) => {
    try {
      await res.task.remove();
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Middleware to get task given the id
async function getTaskFromID(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  res.task = task;
  next();
}
module.exports = routes;
