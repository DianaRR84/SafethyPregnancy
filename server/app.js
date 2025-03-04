const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the new API routes for tips
const apiRoutes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Pregnancy tips routes
app.use("/api/tips", apiRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));


