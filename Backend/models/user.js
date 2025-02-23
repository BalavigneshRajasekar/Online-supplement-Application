const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  mobileNumber: { type: String, default: null },
  supplements: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  resetCode: { type: String, default: null },
  shippingDetails: { type: Object, default: null },
  image: { type: String, default: null },

  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
