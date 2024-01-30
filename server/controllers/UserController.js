// controllers/userController.js
import User from "../models/UserModel.js";

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

    // Create a new user using the User model
    const newUser = await User.create({
      userName,
      phoneNumber,

      password,
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

    // Check if the user exists with the provided phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(401).json({ error: "Invalid phoneNumber or password" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid phoneNumber or password" });
    }

    // If login is successful, send a custom message and the whole user record as JSON response
    res.json({ message: "Login successful", user });
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
