import { Router } from "express";
import multer from "multer";
import CartController from "../controllers/CartController.js";
import { signup, login, getAllUsers } from "../controllers/UserController.js";
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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getAllUsers);

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

router.post("/admin/signup", adminController.adminSignup);

// Admin login
router.post("/admin/login", adminController.adminLogin);

// Get admin inventory

// Add item to admin inventory

// Define routes for getting inventory and adding an item
router.get("/inventory", InventoryController.getInventory);
router.post("/addItem", InventoryController.addItem);
router.put(
  "/updateItem/:itemId",
  upload.single("itemImage"),
  InventoryController.updateItem
);
router.delete("/inventory/:itemId", InventoryController.deleteItem);
// Update item in admin inventory (if needed)

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

// Create a new item in the cart
router.post("/cart", CartController.createCartItem);

// Get all items in the cart
router.get("/cart", CartController.getAllCartItems);

// Get a specific item from the cart by ID
router.get("/cart/user/:userId", CartController.getCartItemsByUserId);

// Update a specific item in the cart by ID
router.put("/cart/:id", CartController.updateCartItem);

// Delete a specific item from the cart by ID
router.delete("/cart/:id", CartController.deleteCartItem);

export default router;
