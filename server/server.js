const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/auth');

const foodRoutes = require("./routes/foodRoutes");
const cosmeticRoutes = require("./routes/cosmeticRoutes");
const tipRoutes = require("./routes/tipRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/food", foodRoutes);
app.use("/api/cosmetic", cosmeticRoutes);
app.use("/api/tip", tipRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
