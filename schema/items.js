const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Items = new Schema({
  product: String,
  url: String,
  price: Number,
  priceSelected: Number,
  email: String,
  active: Boolean,
  timestamp: Date.now(),
});

mongoose.model("Items", Items);
