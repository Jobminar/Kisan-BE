// Import the required modules
import { hash, verify } from "argon2";
import UserModel from "../models/UserModel.js";

// Create a signup controller with phoneNumber
const signup = async (req, res) => {
  try {
    // Get the user input
    const { phoneNumber, password } = req.body;

    // Check if the phoneNumber already exists
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ message: "Phone number already taken" });
    }

    // Hash the password
    const hashedPassword = await hash(password);

    // Create a new user
    const newUser = new UserModel({
      password: hashedPassword,
      phoneNumber,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a login controller with phoneNumber
const login = async (req, res) => {
  try {
    // Get the user input
    const { phoneNumber, password } = req.body;

    // Check if the phoneNumber exists
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "Phone number not found" });
    }

    // Verify the password
    const validPassword = await verify(user.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send a success response
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controllers
export { signup, login };
