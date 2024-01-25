import ItemModel from "../models/Item.js"; // Assuming you've renamed your model to ItemModel
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a controller function for getting the inventory
const getInventory = async (req, res) => {
  try {
    const items = await ItemModel.find(); // Retrieve all items from the collection
    res.status(200).json({ items: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for adding an item to the inventory
const addItem = async (req, res) => {
  try {
    upload.array("itemImages", 5)(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const {
        category,
        itemname,
        description,
        units,
        costPerUnit,
        discount,
        quantity,
      } = req.body;

      const itemImages = req.files;

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

      // Save the new item to the database
      await ItemModel.create(newItem);

      res.status(201).json({ message: "Item added successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to inventory" });
  }
};

// Export the controller functions
export default {
  getInventory,
  addItem,
};
