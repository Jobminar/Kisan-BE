import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  payment: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  price: {
    type: Number,
  },
  orderStatus: {
    type: String,
  },
  addressId: {
    type: String,
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  cartIds: [
    {
      type: String,
    },
  ],
  itemImage: { type: String },
  count: { type: Number },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
