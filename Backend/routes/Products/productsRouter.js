const Products = require("../../models/products");
const express = require("express");

const productRouter = express.Router();

// Sample route for retrieving all supplements

productRouter.get("/products", async (req, res) => {
  try {
    const supplements = await Products.find({});
    res.json(supplements);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Sample route for retrieving supplements By Id

productRouter.get("/products/:id", async (req, res) => {
  const id = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", data: error.message });
  }
});

//Route for retrieve particular products

productRouter.get("/products/category/:category", async (req, res) => {
  const category = req.params;
  try {
    const products = await Products.find({ category: category });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", data: error.message });
  }
});

module.exports = productRouter;
