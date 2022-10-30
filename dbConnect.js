const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.DB_PASSWORD;
const Item = require("./model/items.js");

mongoose.connection.on("open", function () {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to mongoDB");
});

mongoURI = `mongodb+srv://paras:${password}@cluster0.grwj2ys.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURI);

const newItem = new Item({
  product: "watch for me",
  url: "https://buy-me.com",
  price: 4999,
  priceSelected: 4500,
  email: "abc@mail.com",
  active: true,
  timestamp: Date.now(),
});

newItem.save((err, result) => {
  console.log(err);
  console.log(result);
});

// module.exports = db;
