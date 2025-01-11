const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const loginAuth = require("../../middlewares/loginAuth");
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

module.exports = paymentRouter;
