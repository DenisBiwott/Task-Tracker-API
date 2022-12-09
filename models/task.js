const mongoose = require('mongoose');
const Model = mongoose.model;
const taskSchema = require('../schema/task');

// Task model
module.exports = Model('Task', taskSchema);
