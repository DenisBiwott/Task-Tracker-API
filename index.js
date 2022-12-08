const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

// Initialize express
app = express();

// Middleware
app.use(logger.loggerMiddleware);

// Setup static paths
app.use(express.static(path.join(__dirname, 'public')));

// Default router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Task routes
taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

// Get port from the environment else use a default of 3000
const port = process.env.PORT || 3000;

// Listening port (Our server has got to listen on some port)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
