const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const mongoose = require("mongoose");

// Create item under category or subcategory
const createItem = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      categoryId,
      subCategoryId,
      baseAmount,
      taxApplicability,
      tax,
      discount,
    } = req.body;

    // required checks
    if (!name || !categoryId)
      return res
        .status(400)
        .json({ error: "name and categoryId are required" });
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      return res.status(400).json({ error: "Invalid categoryId in the item" });

    const category = await Category.findById(categoryId);
    if (!category)
      return res
        .status(404)
        .json({ error: "Given Category for item not found" });

    let sub = null;
    if (subCategoryId) {
      if (!mongoose.Types.ObjectId.isValid(subCategoryId))
        return res
          .status(400)
          .json({ error: "Invalid subCategoryId in the item" });
      sub = await SubCategory.findById(subCategoryId);
      if (!sub)
        return res
          .status(404)
          .json({ error: "Given SubCategory for item not found" });
    }

    const item = new Item({
      name,
      image,
      description,
      categoryId,
      subCategoryId: subCategoryId || null,
      taxApplicability,
      tax,
      baseAmount,
      discount: discount || 0,
    });

    await item.save();
    res.status(201).json({ message: "Item created successfully", data: item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    // Show items with (categoryId + Category name) and (subCategoryId + subCategory name)
    const items = await Item.find()
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json({
      message: "All items fetched successfully",
      data: items,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all items under a category
const getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ categoryId })
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all items under a subcategory
const getItemsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const items = await Item.find({ subCategoryId })
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get item by id or name
const getItem = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let item;
    if (mongoose.Types.ObjectId.isValid(idOrName)) {
      item = await Item.findById(idOrName)
        .populate("categoryId", "name")
        .populate("subCategoryId", "name");
    } else {
      item = await Item.findOne({ name: idOrName })
        .populate("categoryId", "name")
        .populate("subCategoryId", "name");
    }
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    // If baseAmount or discount updated, recompute totalAmount
    const updateData = { ...req.body };

    if (
      updateData.baseAmount !== undefined ||
      updateData.discount !== undefined
    ) {
      // fetch existing item to get missing values
      const existing = await Item.findById(req.params.id);
      if (!existing) return res.status(404).json({ error: "Item not found" });

      const base =
        updateData.baseAmount !== undefined
          ? Number(updateData.baseAmount)
          : Number(existing.baseAmount);
      const disc =
        updateData.discount !== undefined
          ? Number(updateData.discount)
          : Number(existing.discount || 0);
      updateData.totalAmount = base - disc < 0 ? 0 : base - disc;
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json({
      message: "Item updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search items by name (query param?name=)
const searchItems = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({ error: 'Query param "name" is required' });
    const items = await Item.find({ name: { $regex: name, $options: "i" } })
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItem,
  updateItem,
  searchItems,
};
