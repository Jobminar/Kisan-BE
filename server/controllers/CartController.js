import CartModel from "../models/CartModel.js";

// Create a new item in the cart
const createCartItem = async (req, res) => {
  try {
    const newItem = await CartModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all items in the cart
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific item from the cart by ID
const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you are passing userId as a parameter in your route
    const cartItems = await CartModel.find({ userId });

    if (cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "No items found for the given user ID" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific item in the cart by ID
const updateCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await CartModel.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific item from the cart by ID
const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await CartModel.findByIdAndDelete(itemId);
    if (deletedItem) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
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
};
