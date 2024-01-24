// Import the required modules
import AdminModel from "../models/AdminModel.js";

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

// Create a controller function for updating an item in the inventory
const updateItem = async (req, res) => {
  try {
    // Get the admin id, item type, and item id from the params
    const { adminId, itemType, itemId } = req.params;

    // Get the updated item data from the body
    const updatedItem = req.body;

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

    // Find the index of the item in the inventory array
    const itemIndex = admin.inventory[itemType].findIndex(
      (item) => item._id == itemId
    );

    // Check if the item exists
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the item in the inventory
    admin.inventory[itemType][itemIndex] = {
      ...admin.inventory[itemType][itemIndex],
      ...updatedItem,
    };

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for deleting an item from the inventory
const deleteItem = async (req, res) => {
  try {
    // Get the admin id, item type, and item id from the params
    const { adminId, itemType, itemId } = req.params;

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

    // Find the index of the item in the inventory array
    const itemIndex = admin.inventory[itemType].findIndex(
      (item) => item._id == itemId
    );

    // Check if the item exists
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Remove the item from the inventory
    admin.inventory[itemType].splice(itemIndex, 1);

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controller functions
export default {
  getInventory,
  addItem,
  updateItem,
  deleteItem,
};
