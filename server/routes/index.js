import { Router } from "express";
import multer from "multer";
import CartController from "../controllers/CartController.js";
import {
  signup,
  login,
  getAllUsers,
  updatePassword,
  getUserByUserId,
} from "../controllers/UserController.js";
import contactUsController from "../controllers/contactController.js";
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
import BlogController from "../controllers/BlogController.js";
import { saveOTP, getOTPByEmail } from "../controllers/otpController.js";
import {
  storeMessage,
  getMessagesByUserId,
  deleteMessagesByUserId,
} from "../controllers/messageController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getAllUsers);
router.put("/update-password", updatePassword);
router.post("/api/users", getUserByUserId);
// Bill details routes
router.post("/bill-details", createBillDetails);
router.get("/bill-details", getAllBillDetails);
router.get("/bill-details/:id", getBillDetailsById);
router.put("/bill-details/:id", updateBillDetailsById);
router.delete("/bill-details/:id", deleteBillDetailsById);

// Admin routes
router.post("/admin/signup", adminController.adminSignup);
router.post("/admin/login", adminController.adminLogin);
router.get("/inventory", InventoryController.getInventory);
router.post("/addItem", InventoryController.addItem);
router.put(
  "/updateItem/:itemId",
  upload.single("itemImage"),
  InventoryController.updateItem
);
router.delete("/inventory/:itemId", InventoryController.deleteItem);

// Order routes
router.post("/createorders", OrderController.createOrder);
router.post("/ordersbyuserId", OrderController.getOrderByUserId);
router.get("/getorders", OrderController.getAllOrders);
router.get("/orders/sortByDate", OrderController.sortOrdersbyDate);
router.delete("/orders/:orderId", OrderController.deleteOrder);
router.put("/orders/:orderId", OrderController.updateOrder);
//conatactus__________
// POST route to handle new contact form submissions
router.post("/contact-us", contactUsController.createContactMessage);

// GET route to retrieve all contact form submissions
router.get("/contact-us", contactUsController.getAllContactMessages);
// Address routes
router.put("/orderId/status", OrderController.updateOrderStatus);
router.post("/addresses", AddressController.createAddress);
router.get("/:addressId", AddressController.getAddressById);
router.post("/addresses/getByUserId", AddressController.getAddressesByUserId);
router.delete(
  "/addresses/deleteByUserId",
  AddressController.deleteAddressByUserId
);
router.put(
  "/addresses/updateByUserId",
  AddressController.updateAddressByUserId
);

// Cart routes
router.post("/cart", CartController.createCartItem);
router.get("/cart", CartController.getAllCartItems);
router.get("/cart/:userId", CartController.getCartItemsByUserId);
router.delete("/cart/delete", CartController.deleteCartItemById);
router.put("/cart/:orderId", CartController.updateOrderStatus);

// Audio routes
router.post("/upload-audio", AudioController.postAudio);
router.get("/audio/user/:userId", AudioController.getAudioByUserId);
router.post("/audio/reply", AudioController.postReplyAudio);
router.post("/audio/admin", AudioController.postAudioByAdminId);
router.get("/audio", AudioController.getAllAudio);

// OTP routes
router.post("/otp/save", saveOTP);
router.get("/otp/:email", getOTPByEmail);

// Message routes
router.post("/storemessage", storeMessage);
router.post("/getmessagebyuserId", getMessagesByUserId);
router.post("/delete-messages", deleteMessagesByUserId);

// Blog routes
router.post("/postblog", BlogController.createBlog);
router.post("/getAllblog", BlogController.getAllBlog);

// Contact routes

export default router;
