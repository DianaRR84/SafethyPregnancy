const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Middleware para autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Guardar un producto en el historial del usuario
router.post("/history", authMiddleware, async (req, res) => {
  try {
    const { barcode, name, brand, image, use } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    let product = await Product.findOne({ barcode });

    if (!product) {
      product = new Product({ barcode, name, brand, image, use });
      await product.save();
    }

    // Verificar si el producto ya está en el historial
    const isProductInHistory = user.scanHistory.some(item => item.toString() === product._id.toString());
    
    if (!isProductInHistory) {
      user.scanHistory.push(product._id);
      await user.save();
    }

    res.status(200).json({ message: "Product added to history", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Obtener el historial del usuario
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("scanHistory");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.scanHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
