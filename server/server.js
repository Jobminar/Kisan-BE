import express from "express";
import { connect } from "mongoose";
import routes from "./routes/index.js";
import { config } from "dotenv";
import cors from "cors";
import pkg from "body-parser";
import compression from "compression";
import http from "http";

const { json } = pkg;
const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

// Load environment variables
config();

// Middleware
app.use(json());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// Connect to MongoDB
connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Socket.IO connection handling

// Attach Socket.IO to the HTTP server
import("socket.io").then((socketIO) => {
  const io = new socketIO.Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Your existing socket event handling here

    // Listen for success messages
    socket.on("successMessage", ({ userId, message }) => {
      // Emit the success message to the specific user
      io.to(userId).emit("receiveSuccessMessage", message);
    });

    // Disconnect event handling
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
