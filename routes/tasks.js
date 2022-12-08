const { Router } = require('express');
const express = require('express');
const tasks = require('../Tasks');

routes = express(Router());

// GET everything
routes.get('/', (req, res) => {
  res.json(tasks);
});

// POST request
routes.post('/', (req, res) => {
  res.send('POST request done here');
});

// PUT, GET and POST routes
routes
  .route('/:id')
  .get((req, res) => {
    res.json(tasks.filter((task) => task.id === parseInt(req.params.id)));
  })
  .put((req, res) => {
    res.send('PUT request done here');
  })
  .delete((req, res) => {
    res.send('DELETE request done here');
  });
module.exports = routes;
