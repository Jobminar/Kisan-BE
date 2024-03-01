import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true }, // Change type to String
  message: { type: String, required: true },
});

const Contact = model("Contact", contactSchema);
export default Contact;
