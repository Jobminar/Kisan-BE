// Import the required modules
import { hash, verify } from "argon2";
import UserModel from "../models/UserModel.js";

// Create a signup controller
const signup = async (req, res) => {
  try {
    // Get the user input
    const { fullname, email, password, phoneNumber } = req.body;

    // Check if the email already exists
    const user = await findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await hash(password);

    // Create a new user
    const newUser = new UserModel({
      fullname,
      email,
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

// Create a login controller
const login = async (req, res) => {
  try {
    // Get the user input
    const { email, password } = req.body;

    // Check if the email exists
    const user = await findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Verify the password
    const validPassword = await verify(user.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send a success response with user details
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        // Add any other user details you want to include
      },
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controllers
export { signup, login };
