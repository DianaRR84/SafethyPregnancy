const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");

// Ruta para agregar un nuevo tip
router.post("/", async (req, res) => {
  try {
    const { area, title, body } = req.body;

    if (!area || !title || !body) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const newTip = new Tip({ area, title, body });
    await newTip.save();

    res.status(201).json({ message: "Tip guardado exitosamente." });
  } catch (error) {
    console.error("Error al guardar el tip:", error);
    res.status(500).json({ message: "Error del servidor." });
  }
});

// Obtener todos los tips por tipo
router.get("/:type", async (req, res) => {
    const { type } = req.params;
    try {
      const tips = await Tip.find({ area: type });
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los tips." });
    }
  });
  
  // Obtener un tip por ID
  router.get("/:type/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const tip = await Tip.findById(id);
      if (!tip) {
        return res.status(404).json({ message: "Tip no encontrado." });
      }
      res.json(tip);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el tip." });
    }
  });  

module.exports = router;
