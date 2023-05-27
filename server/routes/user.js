const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    let user = new User(req.body);
    user = await user.save();
    res.send(user);
    console.log("res user:", user);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
