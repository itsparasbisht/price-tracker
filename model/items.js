const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Items = new Schema({
  product: String,
  productUrl: String,
  imageUrl: String,
  price: Number,
  priceSelected: Number,
  email: String,
  active: {
    type: Boolean,
    default: true,
  },
  timestamp: Date,
});

module.exports = mongoose.model("Items", Items);
