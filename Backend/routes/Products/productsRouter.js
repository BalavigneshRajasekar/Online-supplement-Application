const Products = require("../../models/products");
const Review = require("../../models/reviews");
const loginAuth = require("../../middlewares/loginAuth");
const express = require("express");
const multer = require("multer");
const cloudinary = require("../../cloudinary");
const User = require("../../models/user");

const productRouter = express.Router();

const memory = multer.memoryStorage();
const upload = multer({ storage: memory });
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
  console.log(id);

  try {
    // Create a new review
    const newReview = new Review({ comment, user: req.user.id });
    const savedReview = await newReview.save();

    // Add the review to the product
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(savedReview._id);

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

productRouter.post(
  "/profile/add",
  loginAuth,
  upload.array("media"),
  async (req, res) => {
    try {
      const mediaUrls = await Promise.all(
        req.files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "auto",
                upload_preset: "Unsigned",
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            uploadStream.end(file.buffer);
          });
        })
      );
      const user = await User.findById(req.user.id);
      user.image = mediaUrls[0];
      user.save();
      res.status(200).send(mediaUrls[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error", e });
      return;
    }
  }
);

module.exports = productRouter;
