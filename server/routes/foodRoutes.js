const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

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

    const newFood = new Food({ barcode, name, brand, use, ingredients, image });
    await newFood.save();

    res.status(201).json({ message: "Producto con ingredientes guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.get("/:barcode", async (req, res) => {
  try {
    const product = await Food.findOne({ barcode: req.params.barcode });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor." });
  }
});

module.exports = router;
