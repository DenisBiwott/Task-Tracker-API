const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const mongoose = require('mongoose');

// Initialize express
const app = express();

// Middleware
app.use(logger.loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set('view engine', 'ejs');

// Define static path
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection URI (Move to env later)
const dbURI = process.env.dbURI || '';

// Get port from the environment else use a default of 3000
const port = process.env.PORT || 3000;

// Connect to mongoDB via mongoose & Listen on port when done
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Successfully connected to DB');

    // The idea here is to listen after we have successfully connected to the DB
    // Listening port (Our server has got to listen on some port)
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Default router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Task routes
taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);
