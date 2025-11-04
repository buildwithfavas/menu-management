const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
});

// compute totalAmount before save
itemSchema.pre("save", function (next) {
  const base = Number(this.baseAmount || 0);
  const disc = Number(this.discount || 0);
  const total = base - disc;
  this.totalAmount = total < 0 ? 0 : total;
  next();
});

module.exports = mongoose.model("Item", itemSchema);
