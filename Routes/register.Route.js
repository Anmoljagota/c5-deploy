const { RegisterModel } = require("../Models/Register");

const bcrypt = require("bcrypt");
const express = require("express");
const registerRouter = express.Router();
registerRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const finddata = await RegisterModel.find({ name, email, gender });
    if (finddata.length === 0) {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (hash) {
          let create = new RegisterModel({
            name,
            email,
            gender,
            password: hash,
          });
          await create.save();
          res.send("user created");
        } else {
          res.send(err);
        }
      });
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
module.exports = {
  registerRouter,
};
