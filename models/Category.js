const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String }, // URL string
    description: { type: String },
    taxApplicability: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    taxType: { type: String, enum: ["percentage", "flat", ""], default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
