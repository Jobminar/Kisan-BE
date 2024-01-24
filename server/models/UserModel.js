import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  phoneNumber: String,
});

const UserModel = model("User", userSchema);

export default UserModel;
