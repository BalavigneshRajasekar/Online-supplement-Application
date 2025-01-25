const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  paymentData: { type: Object, required: true },
  orderStatus: {
    type: String,
    default: "preparing",
    enum: ["preparing", "Shipped", "Delivered", "Cancelled"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
