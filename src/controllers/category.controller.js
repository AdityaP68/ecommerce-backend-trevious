const createError = require("http-errors");
const Category = require("../models/Category.model");
const categorySchema = require("../utils/validation/categoryValidation");
const mongoose = require("mongoose");

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const identifier = req.params.identifier;
    if (!identifier) {
      res.status(300).redirect("/");
    }
    // Check if the identifier matches a valid MongoDB ObjectId
    const isObjectId = mongoose.isValidObjectId(identifier);
    // Find the category either by ID or name
    const filter = isObjectId ? { _id: identifier } : { name: identifier };
    const existingCategory = await Category.findOne(filter);
    if (!existingCategory) {
      return next(createError(404, "Category not found"));
    }

    res.status(200).send({ queryId: identifier, existingCategory });
  } catch (e) {
    next(createError(500, "Internal Server Error"));
  }
};
// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    const { name, description } = req.body;

    // Check if a category with the given name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(createError(409, "Category already exists"));
    }

    // Create a new Category instance
    const category = new Category({
      name,
      description,
    });

    // Save the category to the database
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

// Edit an existing category
const editCategory = async (req, res, next) => {
  try {
    const identifier = req.params.identifier; // Get the identifier from the request params
    const updateData = req.body; // Get the updated category data from the request body

    // Validate the request body against the schema
    const { error } = categorySchema.validate(updateData);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    // Check if the identifier matches a valid MongoDB ObjectId
    const isObjectId = mongoose.isValidObjectId(identifier);

    // Find the category either by ID or name
    const filter = isObjectId ? { _id: identifier } : { name: identifier };
    const existingCategory = await Category.findOne(filter);
    if (!existingCategory) {
      return next(createError(404, "Category not found"));
    }

    // Update the category properties with the data from the request body
    Object.assign(existingCategory, updateData);

    // Save the updated category
    await existingCategory.save();

    res.status(200).json({
      message: "Category updated successfully",
      category: existingCategory,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

// Delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const identifier = req.params.identifier; // Get the identifier from the request params

    // Check if the identifier matches a valid MongoDB ObjectId
    const isObjectId = mongoose.isValidObjectId(identifier);

    // Find the category either by ID or name
    const filter = isObjectId ? { _id: identifier } : { name: identifier };
    const existingCategory = await Category.findOne(filter);
    if (!existingCategory) {
      return next(createError(404, "Category not found"));
    }

    // Delete the category
    await Category.deleteOne(filter);

    res.status(200).json({
      message: "Category deleted successfully",
      category: existingCategory,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
};
