// controllers/userController.js
import User from "../models/UserModel.js";
import argon2 from "argon2";
// User signup
const signup = async (req, res) => {
  try {
    const { userName, phoneNumber, password } = req.body;

    // Check if the phoneNumber is already registered
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "phoneNumber is already registered" });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user using the User model, storing the hashed password
    const newUser = await User.create({
      userName,
      phoneNumber,
      password: hashedPassword,
    });

    // Send the newly created user as JSON response with a 201 status code
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find the user with the provided phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(401).json({ error: "Invalid phoneNumber or password" });
    }

    // Verify the provided password against the stored hashed password
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid phoneNumber or password" });
    }

    // If login is successful, send a custom message and the user record (excluding password)
    res.json({
      message: "Login successful",
      user: user.toJSON({ exclude: "password" }),
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users excluding the 'password' field
    const users = await User.find({}, { password: 0 });

    // Send the user data as JSON response
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { signup, login, getAllUsers };
