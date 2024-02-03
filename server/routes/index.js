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
import AudioController from "../controllers/AudioController.js";
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
router.put("/addressbyId", SelectAddressController.updateAddress);

// Route for deleting an address by ID
router.delete("/addressbyId", SelectAddressController.deleteAddress);

// Route for getting an address by ID
router.get("/addressbyId", SelectAddressController.getAddressById);

// Get all items in the cart
router.post("/cart", CartController.createCartItem);

// Get all items in the cart
router.get("/cart", CartController.getAllCartItems);

// Get cart items by userId
router.get("/cart/:userId", CartController.getCartItemsByUserId);

// Delete a specific item from the cart by ID
router.delete("/cart/delete", CartController.deleteCartItemById);

// Get cart items by payment status (true)
//cart item
router.put("/cart/:orderId", CartController.updateOrderStatus);

// Upload audio route (for users)
router.post("/uploadaudio", AudioController.saveAudioData);

// Get audio by userId route (for users)
router.get("/getaudio", AudioController.getAudioByUserId);

// Get all audio route (for admin)
router.get("/getAllaudio", AudioController.getAllAudioByAdmin);

// Post audio route by admin
router.post("/postByAdminaudio", AudioController.postAudioByAdmin);

// Delete audio by userId route
router.delete("/deleteaudio", AudioController.deleteAudioByUserId);
router.delete("/deletebyid", AudioController.deleteAudioById);
export default router;
