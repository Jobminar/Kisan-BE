// Import the required modules
import { Schema, model } from "mongoose";

// Define the address schema
const addressSchema = new Schema({
  AddressType: String,
  House_no: String,
  block: String,
  appartment: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
});

// Create the address model
const AddressModel = model("Address", addressSchema);

// Export the address model
export default AddressModel;
