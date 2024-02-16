import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Processing", "Shipped", "Delivered"], // Enum for valid order statuses
  },
  addressId: {
    type: String,
    required: true,
  },
  currentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cartIds: [
    {
      type: String,
      required: true,
    },
  ],
  itemImage: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
