const { PostModel } = require("../Models/Post");
const express = require("express");
const postRouter = express.Router();
postRouter.post("/", async (req, res) => {
  try {
    const adddata = new PostModel(req.body);
    console.log("i am add data", adddata);
    adddata.save();
    res.send("product created");
  } catch (err) {
    res.send(`error:${err}`);
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const newdata = req.body.userId;
  console.log("i am newdata", newdata);
  console.log("i am params", req.params.id);
  console.log(req.body);
  try {
    if (newdata !== req.params.id) {
      res.send("you are not authorized to update this");
    } else {
      await PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.send("data updated");
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const newdata = req.body.userId;
  console.log("i am newdata", newdata);
  console.log("i am params", req.params.id);
  console.log(req.body);
  try {
    if (newdata !== req.params.id) {
      res.send("you are not authorized to update this");
    } else {
      await PostModel.findByIdAndDelete({ _id: req.params.id });
      res.send("data deleted");
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
module.exports = {
  postRouter,
};
