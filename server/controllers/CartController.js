// Import required modules
import CartModel from "../models/CartModel.js";

// Create controller functions
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the cart already exists for the user
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      // If no cart, create a new one
      cart = new CartModel({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += quantity || 1;
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    // Save the cart to the database
    await cart.save();

    res.status(201).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity of the item
    cartItem.quantity = quantity || 1;

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item quantity updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controller functions
export default {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
};
