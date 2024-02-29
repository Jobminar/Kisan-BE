import { Schema, model } from "mongoose";
const ContactusSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});
const Contactus = model("Contactus", ContactusSchema);
export default Contactus;
