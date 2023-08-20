const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // You can add more fields related to categories here
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
