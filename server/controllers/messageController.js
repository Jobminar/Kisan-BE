import Message from "../models/Message.js";

// Store a new message
const storeMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const newMessage = new Message({
      userId,
      message,
    });

    const savedMessage = await newMessage.save();

    if (savedMessage) {
      return res.status(201).json(savedMessage);
    } else {
      return res.status(500).json({ error: "Failed to store the message." });
    }
  } catch (error) {
    console.error("Error storing message:", error);
    return res.status(500).json({ error: "Internal server error." });
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
