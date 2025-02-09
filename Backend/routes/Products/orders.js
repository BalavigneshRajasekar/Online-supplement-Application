const express = require("express");
const Orders = require("../../models/orders");
const loginAuth = require("../../middlewares/loginAuth");
const roleAuth = require("../../middlewares/roleAuth");

const orderRouter = express.Router();

// Route to get Particular users Order

orderRouter.get("/get/myOrders", loginAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ user: req.user.id });
    res.status(200).json({ message: "My orders retrieved", data: orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error", e });
    return;
  }
});

// Route to get all orders in the Application

orderRouter.get(
  "/get/allOrders",
  loginAuth,
  roleAuth("Admin"),
  async (req, res) => {
    try {
      const orders = await Orders.find();
      res.status(200).json({ message: "All orders retrieved", data: orders });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error", e });
      return;
    }
  }
);


// Route to get particular Order
orderRouter.get(
  "/get/orders/:id",
  loginAuth,
  roleAuth("Admin"),
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const order = await Orders.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order retrieved", data: order });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e });
    }
  }
);


// Route to change order status

orderRouter.put(
  "/change/status/:id",
  loginAuth,
  roleAuth("Admin"),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
   
    try {
      const order = await Orders.findByIdAndUpdate(id, { orderStatus:status }, { new: true });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: `Order ${status}`, data: order });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error", e });
    }
  }
);

//Route to update Courier Information and tracking ID

orderRouter.put(
  "/update/courier/:id",
  // loginAuth,
  // roleAuth("Admin"),
  async (req, res) => {
    const { id } = req.params;
    const { courier, trackingId } = req.body;
     
    try {
      const order = await Orders.findOneAndUpdate({_id:id},{$set:{"paymentData.shipping.carrier":courier,"paymentData.shipping.tracking_number":trackingId}},{new:true})
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: `Courier and tracking ID updated`, data: order });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error", e });
    }
  }
);

module.exports = orderRouter;
