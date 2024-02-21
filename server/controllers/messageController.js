// Import the model module
import { Message } from "../models/messageModel.js";

// Define a controller function for sending messages
export function sendMessage(req, res, io) {
  // Get the request body
  const { userId, message } = req.body;

  // Create a new message instance with the request body
  const newMessage = new Message({ userId, message });

  // Save the message to the database
  newMessage.save((err, result) => {
    if (err) {
      // Handle error
      res.status(500).send(err);
    } else {
      // Emit a message to all connected clients
      io.emit("receive_message", newMessage);

      // Send a response
      res.send("Message sent");
    }
  });
}

// Define a controller function for getting messages
export function getMessages(req, res) {
  // Retrieve messages from the database (adjust the query as needed)
  Message.find({}, (err, messages) => {
    if (err) {
      // Handle error more gracefully
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Error fetching messages" });
    } else {
      // Send the messages as a response
      res.json(messages);
    }
  });
}

// Additional functions or modifications can be added as needed
