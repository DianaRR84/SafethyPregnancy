const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aptitude: { 
    type: String,
    enum: ["rojo", "naranja", "amarillo", "verde"],
    required: true,
  },
  info: { type: String, required: true },
});

const cosmeticSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  use: { 
    type: String,
    enum: ["suitable", "avoid", "forbidden"],
    required: true,
  },
  ingredients: [ingredientSchema], // Nuevo campo para los ingredientes
  image: { type: String }
});

module.exports = mongoose.model("Cosmetic", cosmeticSchema);