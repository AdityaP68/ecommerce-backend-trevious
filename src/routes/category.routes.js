const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/category.controller");
const {
  authenticateAccessToken,
} = require("../middleware/authentication.middleware");

// Middleware to authenticate access token for protected routes
router.use(authenticateAccessToken);

// GET /categories - Get a list of all categories
router.get("/", categoryController.getCategories);

// GET /category/:id - Get a category by its name/id
router.get("/:identifier", categoryController.getCategoryById);

// POST /categories - Create a new category
router.post("/", categoryController.createCategory);

// PUT /categories/:id - Edit a category, role admin -----> role based implementation left 
router.put("/:identifier", categoryController.editCategory);

// DELETE /categories/:id - Delete a category, role admin -----> role based implementation left 
router.delete("/:identifier", categoryController.deleteCategory);

module.exports = router;
