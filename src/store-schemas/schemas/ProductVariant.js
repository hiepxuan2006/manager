const { Schema } = require("mongoose");
const ProductOption = require("./ProductOption");

const ProductVariant = new Schema({
  title: {
    type: String,
    trim: true,
  },

  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
    index: true,
  },

  image_uris: {
    type: [String],
  },

  retail_price: {
    type: Number,
    default: 0,
  },

  currency: {
    type: String,
  },

  sku: {
    type: String,
    trim: true,
    index: true,
  },

  is_default: {
    type: Boolean,
    required: true,
    default: false,
    index: true,
  },

  is_active: {
    type: Boolean,
    default: true,
  },

  created: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },

  updated: {
    type: Date,
  },
});
module.exports = ProductVariant;
