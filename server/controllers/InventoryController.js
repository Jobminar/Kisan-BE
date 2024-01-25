import InventoryModel from "../models/Inventory.js";
import multer from "multer";

// Assuming you have a storage configuration for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Create a controller function for getting the inventory
const getInventory = async (req, res) => {
  try {
    // Assuming you have a global 'inventory' variable, modify accordingly
    const inventory = await InventoryModel.findOne(); // Assuming you have a single inventory document
    res.status(200).json({ inventory: inventory });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for adding an item to the inventory
const addItem = async (req, res) => {
  try {
    // Use Multer middleware to handle file uploads
    upload.array("itemImages", 5)(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error occurred
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        // Other error occurred
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Get the item data from the body
      const {
        category,
        itemname,
        description,
        units,
        costPerUnit,
        discount,
        quantity,
      } = req.body;

      // Process image upload with Multer for multiple images
      const itemImages = req.files;

      // Add the item to the inventory with the images
      const newItem = {
        category,
        itemname,
        description,
        units,
        costPerUnit,
        discount,
        quantity,
        itemImages: itemImages
          ? itemImages.map((image) => image.buffer.toString("base64"))
          : [],
      };

      // Find or create a single inventory document
      let inventory = await InventoryModel.findOne();

      if (!inventory) {
        // If inventory doesn't exist, create a new document
        inventory = new InventoryModel({
          freshVegetables: [],
          freshFruits: [],
          offerZone: [],
          quickPicks: [],
        });

        await inventory.save();
      }

      // Modify this line based on your actual data structure
      inventory[category].push(newItem);

      // Save the inventory to the database
      await inventory.save();

      // Send a success response
      res.status(201).json({ message: "Item added successfully" });
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Error adding item to inventory" });
  }
};

// Export the controller functions
export default {
  getInventory,
  addItem,
};
