const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, userObj) => {
    delete userObj.password;
    userObj.hello = "world";
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
