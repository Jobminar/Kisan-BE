// app.js

import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser"; // Use require for CommonJS modules
import routes from "./routes/index.js";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 3000;
import cors from "cors";
// Connect to MongoDB
dotenv.config();
connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(bodyParser.json()); // Use bodyParser.json() instead of json()
app.use(cors());
// Routes
app.use("/", routes);

// Error handler middleware

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
