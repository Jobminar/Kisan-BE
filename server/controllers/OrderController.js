import OrderModel from "../models/OrderModel.js"; // Update the path

// Create a new order
const postOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await OrderModel.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get orders by userId
export const getOrderbyUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ userId }).populate({
      path: "orders.addressId",
      model: "Address", // Assuming your Address model is named 'Address'
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate({
      path: "orders.addressId",
      model: "Address", // Assuming your Address model is named 'Address'
    });
    res.status(200).json(orders);
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
  getOrderbyUserId,
  getAllOrders,
  sortOrdersbyDate,
  deleteOrder,
  updateOrder,
};
