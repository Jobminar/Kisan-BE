import Message from "../models/Message.js";

// Store a new message
const storeMessage = async (userId, message) => {
  try {
    const newMessage = new Message({
      userId,
      message,
    });

    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    throw new Error(`Error storing message: ${error.message}`);
  }
};

// Get messages by userId
const getMessagesByUserId = async (userId) => {
  try {
    const messages = await Message.find({ userId }).sort({ createdAt: "desc" });
    return messages;
  } catch (error) {
    throw new Error(`Error getting messages: ${error.message}`);
  }
};

export { storeMessage, getMessagesByUserId };
