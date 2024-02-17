import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  // payment: {
  //   type: String,
  //   required: true,
  // },
  // paymentId: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // orderStatus: {
  //   type: String,
  //   required: true,
  //   default: "pending", // Default order status if not provided
  // },
  // addressId: {
  //   type: String,
  //   required: true,
  // },
  // currentDate: {
  //   type: Date,
  //   default: Date.now,
  //   required: true,
  // },
  // cartIds: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  // itemImage: {
  //   type: String,
  //   required: true,
  //   default: "defaultImage.jpg", // Default image if not provided
  // },
  // count: {
  //   type: Number,
  //   required: true,
  //   default: 1, // Default count if not provided
  // },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
