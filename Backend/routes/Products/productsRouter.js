const Products = require("../../models/products");
const Review = require("../../models/reviews");
const loginAuth = require("../../middlewares/loginAuth");
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

// // Sample route for retrieving supplements By Id

// productRouter.get("/products/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);

//   try {
//     const product = await Products.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", data: error.message });
//   }
// });

//Route for retrieve particular products

productRouter.get("/products/type/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const products = await Products.find({ supplementType: type });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", data: error.message });
  }
});

//Route for Add review

productRouter.post("/products/:id/review", loginAuth, async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    // Create a new review
    const newReview = new Review({ comment, user: req.user.id });
    const savedReview = await newReview.save();

    // Add the review to the product
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push(savedReview._id);
    await product.save();

    res
      .status(201)
      .json({ message: "Review added to product", review: savedReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get the product with reviews

productRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id).populate({
      path: "reviews",
      populate: { path: "user", select: "username" },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", data: error.message });
  }
});

module.exports = productRouter;
