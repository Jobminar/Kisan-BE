// controllers/userController.js
import User from "../models/UserModel.js";

// User signup
const signup = async (req, res) => {
  try {
    const { userName, phoneNumber, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new user using the User model
    const newUser = await User.create({
      userName,
      phoneNumber,
      email,
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
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Send a success message as JSON response
    res.json({ message: "Login successful" });
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
