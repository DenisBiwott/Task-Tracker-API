const mongoose = require('mongoose');
const Model = mongoose.Model;
const taskSchema = require('../schema/task');

// Task model
const Task = new Model('Task', taskSchema);
module.exports = Task;
