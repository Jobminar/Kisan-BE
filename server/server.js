// app.js

const express = require("express"); // Use require for CommonJS modules
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Connect to MongoDB (remove deprecated options)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(bodyParser.json()); // Correct usage of bodyParser.json()
app.use(cors());

// Routes
app.use("/", routes);

// Error handler middleware (you'll need to implement this)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
