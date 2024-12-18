const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: [String], default: null },
  description: { type: String, default: null },
  category: { type: String, required: true },
  supplementType: { type: String, required: true },
  expirationDate: { type: Date, default: null },

  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
