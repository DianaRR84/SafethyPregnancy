const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  area: {
    type: String,
    enum: ["Have a healthy diet in pregnancy", "Foods to avoid in pregnancy", "Vitamins, supplements and nutrition in pregnancy"],
    required: true,
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model("Tip", tipSchema);
