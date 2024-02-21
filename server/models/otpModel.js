import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 }, // OTP expires after 1 minutes (adjust as needed)
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
