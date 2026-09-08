const jwt = require('jsonwebtoken');

const signToken = (req, res) => { const user = {
    _id: 1,
    username: 'test',
    password: 'test',}}

    
const verifyToken = (req, res) => {}
module.exports = {
  signToken,
  verifyToken,
};