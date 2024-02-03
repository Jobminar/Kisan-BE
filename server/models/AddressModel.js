import { Schema, model } from "mongoose";

const AddressSchema = new Schema({
  userId: String,
  title: String,
  apartments: String,
  address: String,
  city: String,
  streetNoOrName: String,
  state: String,
  country: String,
  PINCODE: String,
});

const AddressModel = model("Address", AddressSchema);

export default AddressModel;
