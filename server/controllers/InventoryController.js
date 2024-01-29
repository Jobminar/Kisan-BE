import ItemModel from "../models/Item.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getInventory = async (_req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addItem = async (req, res) => {
  try {
    upload.single("itemImage")(req, res, async (err) => {
      if (err) {
        console.error(err);

        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: "File upload error" });
        }

        return res.status(500).json({ message: "Internal server error" });
      }

      const { category, itemname, description, units, costPerUnit, discount } =
        req.body;

      // Validate required fields
      if (!category || !itemname || !units || !costPerUnit) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const itemImage = req.file;

      if (!itemImage) {
        console.log("Warning: itemImage is empty");
        // Handle the case where itemImage is empty (e.g., provide a default image)
      }

      const newItem = {
        category,
        itemname,
        description,
        units,
        costPerUnit,
        discount,
        itemImage: itemImage ? itemImage.buffer.toString("base64") : "",
      };

      // Save the new item to the database
      await ItemModel.create(newItem);

      res.status(201).json({ message: "Item added successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to inventory" });
  }
};
const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updates = req.body;

    console.log("Update Item Request - Item ID:", itemId);
    console.log("Update Item Request - Updates:", updates);

    if (!itemId || !updates) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingItem = await ItemModel.findById(itemId);

    if (!existingItem) {
      console.log("Item not found");
      return res.status(404).json({ message: "Item not found" });
    }

    // Log existing item before update
    console.log("Existing Item Before Update:", existingItem);

    // Update item fields based on user input
    Object.assign(existingItem, updates);

    try {
      // Attempt to save the updated item
      const updatedItem = await existingItem.save();

      // Log existing item after update
      console.log("Existing Item After Update:", updatedItem);

      console.log("Item updated successfully");
      res
        .status(200)
        .json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
      // Log validation errors (if any)
      console.log("Validation Error:", error.errors);
      console.error("Error saving updated item:", error);
      console.log("Error updating item in inventory");
      res.status(500).json({ message: "Error updating item in inventory" });
    }
  } catch (error) {
    if (error.code === "RequestHeaderFieldsTooLarge") {
      // Handle 431 error here
      console.log("Request Header Fields Too Large");
      res.status(431).json({ message: "Request Header Fields Too Large" });
    } else {
      console.error(error);
      console.log("Error updating item in inventory");
      res.status(500).json({ message: "Error updating item in inventory" });
    }
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the item by ID
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting item from inventory" });
  }
};

// Export the controllers
export default {
  getInventory,
  addItem,
  updateItem,
  deleteItem,
};
