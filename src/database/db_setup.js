const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect( process.env.db_uri);

// Get the default connection
const db = mongoose.connection;

// Export the database connection
module.exports = db;