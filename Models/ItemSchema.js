const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    requires: [true, "name need to fill"],
    index: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: [true, "price need to fill"],
    min: 0,
  },
  product_id: {
    type: Number,
    required: [true, "Product ID is required"],
  },
  description: {
    type: String,
    min: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Item = new mongoose.model("Item", ItemSchema);
module.exports = Item;
