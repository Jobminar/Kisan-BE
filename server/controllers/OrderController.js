import OrderModel from "../models/OrderModel.js"; // Update the path
import CartModel from "../models/CartModel.js";
import AddressModel from "../models/AddressModel.js";
// Create a new order
// You can customize this based on your file storage needs

const createOrder = (req, res) => {
  // Create a new order with the request body
  const newOrder = new OrderModel(req.body);

  // Save the new order to the database
  newOrder.save((err, order) => {
    // Handle any errors
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    // Return the saved order as a JSON response
    return res.status(201).json(order);
  });
};

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
  createOrder,
  getOrderByUserId,
  getAllOrders,
  getOrderDetails,
  sortOrdersbyDate,
  deleteOrder,
  updateOrder,
};
