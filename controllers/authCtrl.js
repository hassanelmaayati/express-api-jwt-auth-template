const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUDS = 10;

const signup = async (req, res) => {}

module.exports = {
  signup,
}