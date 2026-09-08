const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');


const testJWTCtrl=require('./controllers/test-jwt')
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

//DELETE TEST ROUTES
app.get('/sign-token', testJWTCtrl.signToken);
app.post('/verify-token', testJWTCtrl.verifyToken);

app.listen(3000, () => {
  console.log('The express app is ready!');
});