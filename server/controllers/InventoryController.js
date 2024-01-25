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

      const {
        category,
        itemname,
        description,
        units,
        costPerUnit,
        discount,
        quantity,
      } = req.body;

      // Validate required fields
      if (!category || !itemname || !units || !costPerUnit || !quantity) {
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
        quantity,
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

export default {
  getInventory,
  addItem,
};
