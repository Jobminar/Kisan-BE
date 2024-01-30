// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
