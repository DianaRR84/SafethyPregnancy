const express = require("express");
const router = express.Router();
const Cosmetic = require("../models/Cosmetic");

// Ruta para agregar un producto con ingredientes
router.post("/", async (req, res) => {
  try {
    const { barcode, name, brand, use, ingredients, image } = req.body;

    if ( !barcode || !name || !brand || !use || !ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "Todos los campos son obligatorios, incluyendo al menos un ingrediente." });
    }

    // Validar cada ingrediente
    for (let ingredient of ingredients) {
      const { name, aptitude, info } = ingredient;
      if (!name || !aptitude || !info) {
        return res.status(400).json({ message: "Todos los campos de cada ingrediente son obligatorios" });
      }
    }

    const newCosmetic = new Cosmetic({ barcode, name, brand, use, ingredients, image });
    await newCosmetic.save();

    res.status(201).json({ message: "Producto con ingredientes guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
