const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModel({ username, email, pass: hash });
        await user.save();
        res.status(200).send({ msg: "User created successfully", user });
      } else {
        res.status(400).send({ msg: "error creating the has", Error: err });
      }
    });
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      const token = jwt.sign({ userID: user._id, author: user.username }, "masai");
      if (result) {
        res.status(200).send({
          msg: "Login Sucessful...!",
          token,
        });
      } else {
        res.status(200).send({ msg: "User does not exist , Please register" });
      }
    });
  } catch (err) {
    res.send({ Error: err });
  }
});

module.exports = {
  userRouter,
};
