const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
// server.js

// ... other requires above
const testJwtRouter = require('./controllers/test-jwt');

// ... other middleware

// Routes go here
app.get('sign-token', testJWTCtrl)

app.listen(3000, () => {
  console.log('The express app is ready!');
});