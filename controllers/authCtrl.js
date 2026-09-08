const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUDS = 10;

const signup = async (req, res) => {
try{}catch(err){

  console.log(err)
  res.status(500).json({err: 'something went wrong'})
}


}

module.exports = {
  signup,
}