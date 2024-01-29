import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  category: String,
  itemname: { type: String, required: false }, // Make itemname optional
  units: String,
  costPerUnit: { type: Number, required: false }, // Make costPerUnit optional
  discount: Number,
  description: String,
  itemImage: String,
});

const ItemModel = model("Item", itemSchema);

export default ItemModel;
