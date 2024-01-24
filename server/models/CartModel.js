// Import required modules
import { Schema, model } from "mongoose";

// Create Cart Schema
const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
});

// Create and export Cart Model
const CartModel = model("Cart", cartSchema);
export default CartModel;
