// Import the express module
const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

// Create an instance of an Express application
const app = express();

// Define a route for the root URL (/)
app.get('/', (req, res) => {
  res.send(`Hello World! ${name}`);
});

app.use(express.json());
app.use('/auth', authRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});
