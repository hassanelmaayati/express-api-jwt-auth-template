const express = require("express");
const authCtrl = require("./controllers/authCtrl");
const router = express.router();

app.post("/auth/sign-up", authCtrl.signup);
app.post("/auth/sign-in", authCtrl.login);

module.exports = router;
