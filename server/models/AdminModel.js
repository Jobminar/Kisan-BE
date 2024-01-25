import { Schema, model } from "mongoose";

// Define sub-schema for items (vegetables and fruits)
const itemSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  units: {
    type: String,
    enum: ["kg", "grams", "dozen", "number"],
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
});

// Define order schema
// Define order schema
const orderSchema = new Schema({
  items: [itemSchema],
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Processed", "Shipped", "Delivered"],
    default: "Pending",
  },
  totalAmount: { type: Number, default: 0 },
  paymentMethod: String,
});

// Define admin login schema
const adminLoginSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more admin-related fields as needed
});

// Define the main admin schema
const adminSchema = new Schema({
  adminLogin: adminLoginSchema, // Admin login information
  inventory: inventorySchema,
  orders: [orderSchema],
});

// Create and export the model based on the schema
const AdminModel = model("Admin", adminSchema);

export default AdminModel;
