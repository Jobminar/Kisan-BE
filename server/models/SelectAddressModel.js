import { Schema, model } from "mongoose";

const selectAddressSchema = new Schema({
  title: String,
  apartments: String,
  address: String,
  city: String,
  streetNoOrName: String,
  state: String,
  country: String,
  PINCODE: String,
});

const SelectAddressModel = model("SelectAddress", selectAddressSchema);

export default SelectAddressModel;
