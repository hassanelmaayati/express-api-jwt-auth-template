const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  const brearerToken=req.headers.authorization

  if (!brearerToken)throw new Error('Login ')
  try {
    const token = req.headers.authorization.split("")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } 
  catch (err) {
    res.status(401).json;
  }
};

module.exports = isSignedIn;
