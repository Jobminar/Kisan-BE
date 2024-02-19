import { Router } from "express";
import multer from "multer";
import CartController from "../controllers/CartController.js";
import { signup, login, getAllUsers } from "../controllers/UserController.js";
import adminController from "../controllers/AdminController.js";
import AddressController from "../controllers/AddressController.js";
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
router.post("/createorders", OrderController.createOrder);

// GET: Get orders by userId
router.post("/ordersbyuserId", OrderController.getOrderByUserId);

// GET: Get all orders
router.get("/getorders", OrderController.getAllOrders);

// GET: Get orders sorted by date (ascending)
router.get("/orders/sortByDate", OrderController.sortOrdersbyDate);

// DELETE: Delete an order by orderId
router.delete("/orders/:orderId", OrderController.deleteOrder);

// PUT: Update an order by orderId
router.put("/orders/:orderId", OrderController.updateOrder);
// GET: GET an order by orderId
router.get("/order-details/:orderId", OrderController.getOrderDetails);
//creating addressses and orderId
router.put("/orders/:orderId/status", OrderController.updateOrderStatus);
router.post("/addresses", AddressController.createAddress);
router.get("/:addressId", AddressController.getAddressById);
// Route to get addresses by userId
router.post("/addresses/getByUserId", AddressController.getAddressesByUserId);

// Route to delete an address by userId
router.delete(
  "/addresses/deleteByUserId",
  AddressController.deleteAddressByUserId
);

// Route to update an address by userId
router.put(
  "/addresses/updateByUserId",
  AddressController.updateAddressByUserId
);

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
// Endpoint to post audio data
router.post("/upload-audio", AudioController.postAudio);

// Endpoint to get audio data by userId
router.get("/audio/user/:userId", AudioController.getAudioByUserId);
// Post reply audio with either userId or adminId
router.post("/audio/reply", AudioController.postReplyAudio);
// Add an order for an admin
// Post audio by admin
router.post("/audio/admin", AudioController.postAudioByAdminId);
// Get all audio
router.get("/audio", AudioController.getAllAudio);

export default router;
