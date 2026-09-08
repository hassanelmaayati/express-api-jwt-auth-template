const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUDS = 10;

const signup = async (req, res) => {
  try {
    // verify if the username alrady exists
    const userInDatabase = await User.findOne({ username: req.body.username });
    // if the user exists send error msg
    if (userInDatabase) {
      return res.status(409).json({ err: 'Invalid input' });
    }

    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUDS);
    req.body.password = hashedPassword;

    // else lets check if the password match
    // if password matches create the new user
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      _id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });

    // only allow users that exist to login
    if (!userInDatabase) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // make sure the user's password matches the req.body.password
    if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    const payload = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  signup,
  login,
};