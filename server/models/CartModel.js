import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  category: String,
  itemname: { type: String, required: false },
  units: String,
  costPerUnit: { type: Number, required: false },
  discount: Number,
  description: String,
  itemImage: String,
  userId: String,
  payment: Boolean,
  count: Number,
});

const CartModel = model("Cart", cartSchema);

export default CartModel;
