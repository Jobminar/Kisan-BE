import { Schema, model } from "mongoose";

const billDetailsSchema = new Schema({
  MRP: Number,
  deliveryCharge: Number,
  total: Number,
});

const BillDetailsModel = model("BillDetails", billDetailsSchema);

export default BillDetailsModel;
