// server/routes/api.js
const express = require('express');
const router = express.Router();

// Sample data for each category
const tips = {
  "Have a healthy diet in pregnancy": [
    "Eat a variety of fruits and vegetables for a healthy pregnancy.",
    "Choose whole grains and lean proteins.",
    "Drink plenty of water to stay hydrated.",
    "Limit sugary and processed foods."
  ],
  "Vegetarian or vegan and pregnant": [
    "Ensure you get enough protein from plant-based sources.",
    "Include fortified foods to get enough vitamin B12.",
    "Eat a variety of plant-based foods to ensure balanced nutrition.",
    "Consider taking an iron supplement if necessary."
  ],
  "Foods to avoid in pregnancy": [
    "Avoid raw or undercooked meats, eggs, and seafood.",
    "Do not consume unpasteurized dairy products.",
    "Limit caffeine intake to avoid potential risks.",
    "Avoid deli meats and soft cheeses that could carry harmful bacteria."
  ],
  "Vitamins, supplements and nutrition in pregnancy": [
    "Take prenatal vitamins with folic acid.",
    "Get enough calcium and vitamin D for bone health.",
    "Omega-3 fatty acids are important for fetal brain development.",
    "Consider consulting your doctor about any additional supplements."
  ],
  "Medicines in pregnancy": [
    "Consult your doctor before taking any over-the-counter medications.",
    "Avoid taking medications not prescribed by your healthcare provider.",
    "Use caution when taking herbal or alternative remedies.",
    "Inform your healthcare provider about any pre-existing conditions or allergies."
  ]
};

// Define the route for the API
router.get('/:category', (req, res) => {
  const category = req.params.category;

  if (tips[category]) {
    return res.json({ category, tips: tips[category] });
  } else {
    return res.status(404).json({ error: "Category not found" });
  }
});

module.exports = router;
