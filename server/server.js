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

connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Socket.IO connection handling
import("socket.io").then((socketIO) => {
  const io = new socketIO.Server(server);
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle various socket events here
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
