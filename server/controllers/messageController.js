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
const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required in the request body." });
    }

    const messages = await Message.find({ userId });

    if (messages.length > 0) {
      return res.status(200).json(messages);
    } else {
      return res
        .status(404)
        .json({ error: "No messages found for the given userId." });
    }
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const deleteMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Message.deleteMany({ userId });

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Messages deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ error: "No messages found for the given userId." });
    }
  } catch (error) {
    console.error("Error deleting messages:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { storeMessage, getMessagesByUserId, deleteMessagesByUserId };
