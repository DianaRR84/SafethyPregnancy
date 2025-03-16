// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

module.exports = router;
