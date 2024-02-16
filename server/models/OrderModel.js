import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: Schema.Types.Mixed,
  payment: Schema.Types.Mixed,
  paymentId: Schema.Types.Mixed,
  price: Schema.Types.Mixed,
  orderStatus: Schema.Types.Mixed,
  addressId: Schema.Types.Mixed,
  currentDate: Schema.Types.Mixed,
  cartIds: Schema.Types.Mixed,
  itemImage: Schema.Types.Mixed,
  count: Schema.Types.Mixed,
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
