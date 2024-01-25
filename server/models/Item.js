import { Schema, model } from "mongoose";

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

const ItemModel = model("Item", itemSchema);

export default ItemModel;
