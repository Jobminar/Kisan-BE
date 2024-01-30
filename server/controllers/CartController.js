import CartModel from "../models/CartModel.js";

const createCartItem = async (req, res) => {
  try {
    // Validate and sanitize req.body using express-validator or other libraries
    const newItem = await CartModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCartItems = async (req, res) => {
  try {
    // Implement pagination if needed
    const cartItems = await CartModel.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartModel.find({ userId });
    res.status(200).json(cartItems); // Return an empty array if no items are found
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const existingItem = await CartModel.findById(itemId);

    if (existingItem) {
      // Update the item if it exists
      const updatedItem = await CartModel.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const existingItem = await CartModel.findById(itemId);

    if (existingItem) {
      // Delete the item if it exists
      await CartModel.findByIdAndDelete(itemId);
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItemsByPaymentStatus = async (req, res) => {
  try {
    const cartItems = await CartModel.find({ payment: true });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCartItem,
  getAllCartItems,
  getCartItemsByUserId,
  updateCartItem,
  deleteCartItem,
  getCartItemsByPaymentStatus,
};
