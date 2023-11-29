const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    requires: ["name need to fill"],
    index: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: ["price need to fill"],
    min: 0,
  },
  product_id: {
    type: Number,
    required: ["product id need to fill"],
  },
  description: {
    type: String,
    min: 5,
  },
  userId: {
    type: mongoose.Schema.Types.userId,
    ref: "User",
    require: true,
  },
});

const Item = new mongoose.model("Item", ItemSchema);
module.exports = Item;
