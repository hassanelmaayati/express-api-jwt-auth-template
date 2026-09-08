/* eslint-disable prefer-destructuring */
const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const authCtrl = require('./controllers/authCtrl');
const isSignedIn = require('./middleware/isSignedIn');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));


// PUBLIC
app.post('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-in', authCtrl.login);

// PROTECTED
app.use(isSignedIn);

app.get('/protected', (req, res) => {
  try {
    const userPayload = req.user;

    res.status(200).json({ user: userPayload });
  } catch (error) {
    res.status(500).json({ err: 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});