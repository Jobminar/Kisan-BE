import { Schema, model } from "mongoose";

const contactUsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add a validation for email format if needed
  },
  phoneNo: {
    type: String,
    // You might want to add validation for phone number format
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactUs = model("ContactUs", contactUsSchema);

export default ContactUs;
