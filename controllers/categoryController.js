const Category = require("../models/Category");
const mongoose = require("mongoose");

// Utility
function mongooseIsObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax, taxType } =
      req.body;
    const category = new Category({
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
    });
    const savedCategory = await category.save();
    res.status(201).json({
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to create category",
      error: err.message,
    });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      message: "Fetched all categories",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get all category",
      error: err.message,
    });
  }
};

// Get by id or name
const getCategory = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let category;
    if (mongooseIsObjectId(idOrName)) {
      category = await Category.findById(idOrName);
    } else {
      category = await Category.findOne({ name: idOrName });
    }
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCategory, getCategories, getCategory, updateCategory };
