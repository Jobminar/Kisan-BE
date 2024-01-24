// Import the required modules
import AdminModel from "../models/AdminModel.js";
import { hash, verify } from "argon2"; // For password hashing

// Create a controller function for admin signup
const adminSignup = async (req, res) => {
  try {
    // Get the admin input
    const { username, password } = req.body;

    // Check if the username already exists
    const admin = await findOne({ "adminLogin.username": username });
    if (admin) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await hash(password);

    // Create a new admin
    const newAdmin = new AdminModel({
      adminLogin: {
        username,
        password: hashedPassword,
      },
      inventory: {
        freshVegetables: [],
        freshFruits: [],
        offerZone: [],
        quickPicks: [],
      },
      orders: [],
    });

    // Save the admin to the database
    await newAdmin.save();

    // Send a success response
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for admin login
const adminLogin = async (req, res) => {
  try {
    // Get the admin input
    const { username, password } = req.body;

    // Check if the username exists
    const admin = await findOne({ "adminLogin.username": username });
    if (!admin) {
      return res.status(404).json({ message: "Username not found" });
    }

    // Verify the password
    const validPassword = await verify(admin.adminLogin.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send a success response
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for getting the inventory
const getInventory = async (req, res) => {
  try {
    // Get the admin id from the params
    const { adminId } = req.params;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send the inventory as a response
    res.status(200).json({ inventory: admin.inventory });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for adding an item to the inventory
const addItem = async (req, res) => {
  try {
    // Get the admin id and the item type from the params
    const { adminId, itemType } = req.params;

    // Get the item data from the body
    const item = req.body;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the item type is valid
    if (
      !["freshVegetables", "freshFruits", "offerZone", "quickPicks"].includes(
        itemType
      )
    ) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    // Add the item to the inventory
    admin.inventory[itemType].push(item);

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controller functions
export default {
  adminSignup,
  adminLogin,
  getInventory,
  addItem,
};
