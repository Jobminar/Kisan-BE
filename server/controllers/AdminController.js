import AdminModel from "../models/AdminModel.js";
import { hash, verify } from "argon2";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a controller function for admin signup
const adminSignup = async (req, res) => {
  try {
    // Get the admin input
    const { username, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await findOne({ "adminLogin.username": username });
    if (existingAdmin) {
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
    console.error("Error in adminSignup:", error);
    res.status(500).json({ message: "Error creating admin" });
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
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Error logging in admin" });
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
    console.error("Error in getInventory:", error);
    res.status(500).json({ message: "Error fetching inventory" });
  }
};

// Create a controller function for adding an item to the inventory
const addItem = async (req, res) => {
  try {
    // Get the item type from the params
    const { itemType } = req.params;

    // Get the item data from the body
    const { name, description, units, costPerUnit, discount, quantity } =
      req.body;

    // Check if the item type is valid
    const validItemTypes = [
      "freshVegetables",
      "freshFruits",
      "offerZone",
      "quickPicks",
    ];
    if (!validItemTypes.includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    // Process image upload with Multer
    const itemImage = req.file; // assuming the file input in the form is named 'itemImage'

    // Add the item to the inventory with the image
    const newItem = {
      name,
      description,
      units,
      costPerUnit,
      discount,
      quantity,
      itemImage: itemImage ? itemImage.buffer.toString("base64") : null,
    };

    // Modify this line based on your actual data structure, assuming 'inventory' is available globally
    getInventory[itemType].push(newItem);

    // Send a success response
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error in addItem:", error);
    res.status(500).json({ message: "Error adding item to inventory" });
  }
};

// Use Multer middleware to handle file uploads
const uploadMiddleware = upload.single("itemImage");

// Export the controller functions and the Multer middleware
export default {
  adminSignup,
  adminLogin,
  getInventory,
  addItem: [uploadMiddleware, addItem],
  uploadMiddleware,
};
