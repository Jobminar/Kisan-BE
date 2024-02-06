import { Schema, model } from "mongoose";

const AddressSchema = new Schema({
  userId: String,
  area: String,
  Type: String,
  apartments: String,
  address: String,
  city: String,
  streetNoOrName: String,
  state: String,
  country: String,
  pincode: String,
});

const AddressModel = model("Address", AddressSchema);

export default AddressModel;
