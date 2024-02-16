import multer from "multer";
import OrderModel from "../models/OrderModel.js"; // Update the path
import CartModel from "../models/CartModel.js";
import AddressModel from "../models/AddressModel.js";
// Create a new order
const storage = multer.memoryStorage(); // Store images in memory as buffers
const upload = multer({ storage: storage });

// Create a new order with Multer for handling file uploads
const postOrder = upload.single("itemImage", async (req, res) => {
  try {
    // Check if required fields are present in the request body
    const requiredFields = [
      "userId",
      "payment",
      "paymentId",
      "price",
      "orderStatus",
      "addressId",
      "cartIds",
      "itemImage",
      "count",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ error: `${field} is required in the request body` });
      }
    }

    const orderData = {
      userId: req.body.userId,
      payment: req.body.payment,
      paymentId: req.body.paymentId,
      price: req.body.price,
      orderStatus: req.body.orderStatus,
      addressId: req.body.addressId,
      currentDate: req.body.currentDate,
      cartIds: req.body.cartIds,
      itemImage: req.body.itemsImage,
      count: req.body.count,
    };

    // If a file is uploaded, convert the itemImage buffer to base64
    if (req.file) {
      orderData.itemImage = req.file.buffer.toString("base64");
    }

    const newOrder = await OrderModel.create(orderData);
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);

    // Handle different types of errors and provide appropriate error messages
    if (error.name === "ValidationError") {
      // Mongoose validation error
      res
        .status(400)
        .json({ error: "Validation error. Please check your input fields." });
    } else {
      // Generic internal server error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

const getOrderDetails = async (order) => {
  try {
    const cartDetails = await CartModel.findById(order.cartIds[0]);
    const addressDetails = await AddressModel.findById(order.addressId);

    if (!cartDetails || !addressDetails) {
      throw new Error("Cart or Address details not found");
    }

    return {
      ...order.toObject(),
      cartDetails: cartDetails.toObject(),
      addressDetails: addressDetails.toObject(),
    };
  } catch (error) {
    console.error(
      `Error fetching details for order ${order._id}: ${error.message}`
    );
    throw error;
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    const orders = await OrderModel.find({ userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => getOrderDetails(order))
    );

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get orders sorted by date (ascending)
const sortOrdersbyDate = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .sort({ "orders.currentDate": 1 })
      .populate("orders.addressId");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order by orderId
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an order by orderId
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrderData = req.body;
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$": updatedOrderData } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  postOrder,
  getOrderByUserId,
  getAllOrders,
  getOrderDetails,
  sortOrdersbyDate,
  deleteOrder,
  updateOrder,
};
