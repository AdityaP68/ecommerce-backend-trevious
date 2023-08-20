const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { authenticateAccessToken } = require("../middleware/authentication.middleware");

// Middleware to authenticate access token for protected routes
router.use(authenticateAccessToken);

// GET /categories - Get a list of all categories
router.get("/", categoryController.getCategories);

// POST /categories - Create a new category
router.post("/", categoryController.createCategory);

// PUT /categories/:id - Edit a category
router.put("/:identifier", categoryController.editCategory);

// DELETE /categories/:id - Delete a category
router.delete("/:identifier", categoryController.deleteCategory);

module.exports = router;
