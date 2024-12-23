const express = require("express");
const Products = require("../../models/products");
const multer = require("multer");
const cloudinary = require("../../cloudinary");

// Multer setup for handling image uploads
const memory = multer.memoryStorage();
const upload = multer({ storage: memory });

const supplementRouter = express.Router();

// Sample route for adding a new supplement

supplementRouter.post("/add", upload.array("image"), async (req, res) => {
  const {
    name,
    price,
    description,
    quantity,
    category,
    supplementType,
    expirationDate,
  } = req.body;

  try {
    //Upload image to cloudinary
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

    const newSupplement = new Products({
      name,
      price,
      description,
      quantity,
      image: mediaUrls.filter(
        (file) => file.endsWith(".jpg") || file.endsWith(".png")
      ),
      category,
      supplementType,
      expirationDate,
    });

    const savedSupplement = await newSupplement.save();

    res
      .status(201)
      .json({ message: "saved successfully", data: savedSupplement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", err: error.message });
  }
});

// Sample route for updating a supplement by ID

supplementRouter.put("/update/:id", upload.array("image"), async (req, res) => {
  const {
    name,
    price,
    description,
    quantity,
    category,
    supplementType,
    expirationDate,
  } = req.body;

  const { id } = req.params;

  try {
    //Upload image to cloudinary
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

    const newSupplement = await Products.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        quantity,
        image: mediaUrls.filter(
          (file) => file.endsWith(".jpg") || file.endsWith(".png")
        ),
        category,
        supplementType,
        expirationDate,
      },
      { new: true, runValidators: true }
    );

    res
      .status(201)
      .json({ message: "Updated successfully", data: newSupplement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", err: error.message });
  }
});

// Sample route for deleting a supplement by ID

supplementRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params.id;

  try {
    const deletedSupplement = await Products.findByIdAndDelete(id);
    if (!deletedSupplement)
      return res.status(404).json({ message: "Supplement not found" });

    res.json({ message: "Deleted successfully", data: deletedSupplement });
  } catch (error) {
    res.status(500).json({ message: "Server Error", err: error.message });
  }
});

module.exports = supplementRouter;
