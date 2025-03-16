const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
//const JWT_SECRET = process.env.JWT_SECRET; // Change this in production

// Register a new user
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists (by email or username)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered. Please log in." });
    }

    // Create and save new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`No user found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(`Password mismatch for user: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protect routes using JWT middleware to get user data
router.get("/getUser", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Retrieve token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user based on the decoded token data (user id)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the user data (but not the password)
    res.json({
      username: user.username,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;


