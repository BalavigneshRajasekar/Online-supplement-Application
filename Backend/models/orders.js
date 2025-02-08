const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Object, required: true }],
  paymentData: { type: Object, required: true },
  orderStatus: {
    type: String,
    default: "New Order",
    enum: [
      "New Order",
      "Confirmed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
