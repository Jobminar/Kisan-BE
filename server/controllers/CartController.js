// controllers/cartController.js
import CartModel from "../models/CartModel.js";
import multer from "multer";

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // You can adjust storage options based on your needs
const upload = multer({ storage: storage });

// Create a new cart item with multer upload
const createCartItem = async (req, res) => {
  try {
    const {
      category,
      itemname,
      units,
      costPerUnit,
      discount,
      description,
      userId,
      payment,
      price,
      count,
      orderStatus,
    } = req.body;

    // Check if 'itemImage' is present in the request
    let itemImage;

    if (req.file) {
      // If a file is uploaded, convert it to a base64-encoded string
      itemImage = req.file.buffer.toString("base64");
    } else if (typeof req.body.itemImage === "string") {
      // If 'itemImage' is already a string, use it as is
      itemImage = req.body.itemImage;
    }

    // Create a new cart item using the CartModel
    const newCartItem = await CartModel.create({
      category,
      itemname,
      units,
      costPerUnit,
      discount,
      description,
      itemImage,
      userId,
      payment,
      price,
      count,
      orderStatus,
    });

    // Send the newly created cart item as a JSON response with a 201 status code
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ error: "Bad Request" });
  }
};

// GET controller logic to retrieve all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET controller logic to retrieve cart items by userId
const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartModel.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Assuming you have an orderId to identify the cart item
    const { orderStatus } = req.body;

    // Check if orderId and orderStatus are provided
    if (!orderId || !orderStatus) {
      return res.status(400).json({
        error: "orderId and orderStatus are required in the request body",
      });
    }

    // Update the orderStatus for the specified cart item
    const updatedCartItem = await CartModel.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus } },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE controller logic to delete cart items by userId
const deleteCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedItems = await CartModel.deleteMany({ userId });
    res.status(200).json({
      message: `Deleted ${deletedItems.deletedCount} items for user ${userId}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCartItem,
  getAllCartItems,
  getCartItemsByUserId,
  deleteCartItemsByUserId,
  updateOrderStatus,
  upload,
};
