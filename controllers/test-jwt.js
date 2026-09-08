const jwt = require("jsonwebtoken");

const signToken = (req, res) => {
  const user = {
    _id: 1,
    username: "test",
    password: "test",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({ message: "You are Auth'd", token });
};

const verifyToken = (req, res) => {};
module.exports = {
  signToken,
  verifyToken,
};
