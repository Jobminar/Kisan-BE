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
    type: Schema.Types.ObjectId,
    ref: "Address", // Reference to the 'Address' model
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  cartIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart", // Reference to the 'Cart' model
    },
  ],
  itemImage: { type: String },
  count: { type: Number },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
