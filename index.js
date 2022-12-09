require('dotenv').config();

const env = process.env;
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
const dbURI = `mongodb+srv://${env.DB_USER}:${env.DB_USER_PASS}@${env.DB_CLUSTER}/${env.DB_NAME}?retryWrites=true&w=majority`;

// Get port from the environment else use a default of 3000
const port = env.PORT || 3000;

// Set mongoose strict query to true
// Suppress deprecation warning on changes coming with mongoose 7
mongoose.set('strictQuery', true);
// Connect to mongoDB via mongoose & Listen on port when done
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // The idea here is to listen after we have successfully connected to the DB
    // Listening port (Our server has got to listen on some port)
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });

// Database connection
db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log('Successfully connected to the Database');
});

// Default router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Task routes
taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);
