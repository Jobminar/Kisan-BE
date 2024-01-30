import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  category: {
    type: String,
  },
  itemname: {
    type: String,
  },
  units: {
    type: String,
  },
  costPerUnit: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  itemImage: {
    type: String,
  },
  userId: {
    type: String,
  },
  payment: {
    type: String,
  },
  count: {
    type: Number,
  },
  orderStatus: {
    type: String,
  },
});

const CartModel = model("Cart", cartSchema);

export default CartModel;
