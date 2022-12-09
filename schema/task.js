const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task schema
const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    reminder: {
      type: Boolean,
      required: true,
    },
  },
  // Adds temporal data (createdAt & updatedAt)
  {
    timestamps: true,
  }
);

module.exports = taskSchema;
