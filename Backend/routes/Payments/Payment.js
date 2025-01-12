const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const loginAuth = require("../../middlewares/loginAuth");
const User = require("../../models/user");
const paymentRouter = express.Router();

paymentRouter.post("/payment", loginAuth, async (req, res) => {
  console.log(req.body);

  const { amount, shipping } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "TEST PAYMENT",
      metadata: { integration_check: "accept payment" },
      shipping: shipping,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error", e });
    return;
  }
});

paymentRouter.get("/stripe/apiKey", (req, res) => {
  res.status(200).send(process.env.STRIPE_API);
});

paymentRouter.post("/Shipping/details", loginAuth, async (req, res) => {
  console.log("hello");

  try {
    const user = await User.findByIdAndUpdate(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.shippingDetails = req.body;
    await user.save();
    res.status(200).json({
      message: "Shipping details updated",
      data: user.shippingDetails,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error", e });
    return;
  }
});

paymentRouter.get("/shipping/details", loginAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "Shipping details retrieved",
      data: user.shippingDetails,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error", e });
    return;
  }
});

module.exports = paymentRouter;
