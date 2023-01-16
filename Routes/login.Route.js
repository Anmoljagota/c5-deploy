const { RegisterModel } = require("../Models/Register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const loginRouter = express.Router();
loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const finddata = await RegisterModel.find({ email });
    console.log("hlo", finddata[0]._id);
    if (finddata.length > 0) {
      bcrypt.compare(password, finddata[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: finddata[0]._id }, "logging");
          res.send(token);
        } else {
          res.send("user not found");
        }
      });
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
module.exports = {
  loginRouter,
};
