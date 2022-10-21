const mongoose = require("mongoose");
const { Schema } = mongoose;

const Product = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  slug: {
    type: String,
    trim: true,
    required: true,
    index: true,
  },

  description: {
    type: String,
    trim: true,
  },

  tags: [
    {
      type: String,
      trim: true,
      index: true,
    },
  ],

  variants: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
  ],

  attributes: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductAttribute",
    },
  ],

  is_deleted: {
    type: Boolean,
    default: false,
    index: true,
  },

  is_active: {
    type: Boolean,
    default: false,
    index: true,
  },

  retail_price: {
    type: Number,
    index: true,
  },

  sale_price: {
    type: Number,
  },

  images: [
    {
      type: String,
    },
  ],

  meta: {
    type: Schema.Types.Mixed,
    default: {},
  },

  created: {
    type: Date,
    required: true,
    index: true,
    default: Date.now,
  },

  updated: {
    type: Date,
  },

  deleted_at: {
    type: Date,
  },

  creator: {
    type: String,
    default: "seller",
    enum: ["seller", "buyer", "external"],
    trim: true,
    index: true,
  },
});

module.exports = Product;
