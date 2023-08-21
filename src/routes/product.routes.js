const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/category.controller");
const {
  authenticateAccessToken,
} = require("../middleware/authentication.middleware");

// GET - product list

// GET - product by id

// GET - product by category

// GET - product by price range

// PUT - update product by id , role admin

// DELETE - delete product by id, role admin



module.exports =  router