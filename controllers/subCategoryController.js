const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const mongoose = require("mongoose");

// Create subcategory under a category
const createSubCategory = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      categoryId,
      taxApplicability,
      tax,
      taxType,
    } = req.body;
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Valid categoryId is required" });
    }
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ error: "Parent Category not found" });

    const sub = new SubCategory({
      name,
      image,
      description,
      categoryId,
      taxApplicability,
      tax,
      taxType,
    });

    await sub.save();
    res.status(201).json({
      message: "Subcategory created successfully",
      data: sub,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subcategories
const getSubCategories = async (req, res) => {
  try {
    const subs = await SubCategory.find().populate("categoryId", "name");
    res.json({
      message: "Fetched all Subcategory",
      data: subs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get subcategories under a category
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subs = await SubCategory.find({ categoryId }).populate(
      "categoryId",
      "name"
    );
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get subcategory by id or name
const getSubCategory = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let sub;
    if (mongoose.Types.ObjectId.isValid(idOrName)) {
      sub = await SubCategory.findById(idOrName).populate("categoryId", "name");
    } else {
      sub = await SubCategory.findOne({ name: idOrName }).populate(
        "categoryId",
        "name"
      );
    }
    if (!sub) return res.status(404).json({ error: "SubCategory not found" });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update subcategory
const updateSubCategory = async (req, res) => {
  try {
    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ error: "SubCategory not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
  getSubCategory,
  updateSubCategory,
};
