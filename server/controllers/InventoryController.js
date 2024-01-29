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
    // Validate required fields in the request body
    const { itemId, category, itemname, units, costPerUnit } = req.body;

    if (!itemId || !category || !itemname || !units || !costPerUnit) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if base64 string is provided in the request body
    const { itemImage } = req.body;

    // Find the item by ID
    const existingItem = await ItemModel.findById(itemId);

    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item details
    existingItem.category = category;
    existingItem.itemname = itemname;
    existingItem.description = req.body.description || "";
    existingItem.units = units;
    existingItem.costPerUnit = costPerUnit;
    existingItem.discount = req.body.discount || 0;

    // Check if a new itemImage is provided as a base64 string
    if (itemImage) {
      existingItem.itemImage = itemImage;
    } else if (req.file) {
      // If no base64 string is provided, check if a file is uploaded
      existingItem.itemImage = req.file.buffer.toString("base64");
    }

    // Save the updated item to the database
    await existingItem.save();

    res
      .status(200)
      .json({ message: "Item updated successfully", item: existingItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating item in inventory" });
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
