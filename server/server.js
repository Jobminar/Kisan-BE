import express from "express";
import { connect } from "mongoose";
import routes from "./routes/index.js";
import { config } from "dotenv";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
const app = express();
const port = process.env.PORT || 3000;
import compression from "compression";
import bodyParser from "body-parser";
// Load environment variables
config();
// Middleware
app.use(json()); // Correct usage of bodyParser.json()
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
// Routes
app.use("/", routes);
// Connect to MongoDB (remove deprecated options)
connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Error handler middleware (you'll need to implement this)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
