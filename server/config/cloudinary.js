const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // 📌 Agregar en `.env`
  api_key: process.env.CLOUDINARY_API_KEY,       // 📌 Agregar en `.env`
  api_secret: process.env.CLOUDINARY_API_SECRET, // 📌 Agregar en `.env`
  secure: true,
});

module.exports = { cloudinary };
