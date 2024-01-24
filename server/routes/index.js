import { Router } from "express";
const router = Router();

import { signup, login } from "../controllers/UserController.js";
import adminController from "../controllers/AdminController.js";
import SelectAddressController from "../controllers/SelectAddressController.js";
import InventoryController from "../controllers/InventoryController.js";
import OrderController from "../controllers/OrderController.js";
import {
  createBillDetails,
  getAllBillDetails,
  getBillDetailsById,
  updateBillDetailsById,
  deleteBillDetailsById,
} from "../controllers/BillDetailsController.js";

router.post("/signup", signup);
router.post("/login", login);
// Add more routes as needed
// Create a new bill details entry
router.post("/bill-details", createBillDetails);

// Get all bill details entries
router.get("/bill-details", getAllBillDetails);

// Get a specific bill details entry by ID
router.get("/bill-details/:id", getBillDetailsById);

// Update a specific bill details entry by ID
router.put("/bill-details/:id", updateBillDetailsById);

// Delete a specific bill details entry by ID
router.delete("/bill-details/:id", deleteBillDetailsById);

// Admin signup
router.post("/admin/signup", adminController.adminSignup);

// Admin login
router.post("/admin/login", adminController.adminLogin);

// Get admin inventory
router.get("/:adminId/inventory", adminController.getInventory);

// Add item to admin inventory
router.post("/:adminId/inventory/:itemType/add", adminController.addItem);

// Get admin inventory
router.get("/:adminId/inventory", InventoryController.getInventory);

// Add item to admin inventory
router.post("/:adminId/inventory/:itemType/add", InventoryController.addItem);

// Update item in admin inventory
router.put(
  "/:adminId/inventory/:itemType/:itemId/update",
  InventoryController.updateItem
);

// Delete item from admin inventory
router.delete(
  "/:adminId/inventory/:itemType/:itemId/delete",
  InventoryController.deleteItem
);

// Get all orders
router.get("/admin/:adminId/orders", OrderController.getAllOrders);

// Get order by ID
router.get("/admin/:adminId/orders/:orderId", OrderController.getOrderById);

// Create a new order
router.post("/admin/:adminId/orders/create", OrderController.createOrder);

// Update an order
router.put(
  "/admin/:adminId/orders/:orderId/update",
  OrderController.updateOrder
);

// Delete an order
router.delete(
  "/admin/:adminId/orders/:orderId/delete",
  OrderController.deleteOrder
);
router.post("/addresses", SelectAddressController.addAddress);

// Route for updating an address by ID
router.put("/addresses/:addressId", SelectAddressController.updateAddress);

// Route for deleting an address by ID
router.delete("/addresses/:addressId", SelectAddressController.deleteAddress);

// Route for getting an address by ID
router.get("/addresses/:addressId", SelectAddressController.getAddressById);
export default router;
