import { Schema, model } from "mongoose";

// Define sub-schema for items (vegetables and fruits)
const itemSchema = new Schema({
  category: { type: String, required: false },
  itemname: { type: String, required: true },
  units: {
    type: String,
    default: "kg",
  },
  costPerUnit: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  description: String,
  itemImage: [{ type: String }],
});

// Define inventory schema
const inventorySchema = new Schema({
  freshVegetables: [itemSchema],
  freshFruits: [itemSchema],
  offerZone: [itemSchema],
  quickPicks: [itemSchema],
  additionals: [itemSchema],
});

// Create and export the model based on the schema
const InventoryModel = model("Inventory", inventorySchema);

export default InventoryModel;
