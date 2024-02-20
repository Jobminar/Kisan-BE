// Import the model module
import { Message } from "../models/messageModel.js";

// Define a controller function for sending messages
export function sendMessage(req, res) {
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
      // Emit a message to the client with the same userId
      io.to(userId).emit("receive_message", newMessage);

      // Send a response
      res.send("Message sent");
    }
  });
}

// Define a controller function for getting messages
export function getMessages(req, res) {
  // Listen for the connection event
  io.on("connection", (socket) => {
    // Listen for the send_message event
    socket.on("send_message", (data) => {
      // Get the userId and message from the data
      const { userId, message } = data;

      // Emit a message to the client with the same userId
      io.to(userId).emit("receive_message", message);
    });
  });

  // Send a response
  res.send("Listening for messages");
}
