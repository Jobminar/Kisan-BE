import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  itemId: {
    type: String,
  },
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
  payment: {
    type: String,
  },
  count: {
    type: Number,
  },
  price: {
    type: Number,
  },
  orderStatus: {
    type: String,
  },
  zone: {
    type: String,
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address", // Reference to the 'Address' model
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;