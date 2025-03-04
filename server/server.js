const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

require("dotenv").config(); // Load environment variables

const authRoutes = require("./routes/auth"); // Import auth routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests

// Routes
app.use("/auth", authRoutes); 

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
