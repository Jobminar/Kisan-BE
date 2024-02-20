// Import mongoose
import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
});

// Export the message model
export const Message = mongoose.model("Message", messageSchema);
