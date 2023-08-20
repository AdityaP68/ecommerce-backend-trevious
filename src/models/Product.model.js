const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the product (e.g., "Smartphone")
  price: { type: Number, required: true }, // Price of the product
  description: { type: String, required: true }, // Description of the product
  availability: { type: Boolean, default: true }, // Availability status of the product
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Reference to the associated category
  // New fields for product name and description
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  // You can add more product-related fields here
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
