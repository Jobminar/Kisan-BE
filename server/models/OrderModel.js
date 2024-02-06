import { Schema, model } from "mongoose";

const singleOrderSchema = new Schema({
  userId: {
    type: String,
  },
  itemId: {
    type: String,
  },
  itemname: {
    type: String,
  },
  costPerUnit: {
    type: Number,
  },
  discount: {
    type: Number,
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
  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address", // Reference to the 'Address' model
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
});

const orderSchema = new Schema({
  orders: [singleOrderSchema],
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
