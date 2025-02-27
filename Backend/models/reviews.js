const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rating: { type: Number, default: 1, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
