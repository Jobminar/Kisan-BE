// orderController.js

import OrderModel from "../models/OrderModel.js"; // Update the path accordingly

const isAdmin = (adminId) => {
  // Your implementation of isAdmin function
};

const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: `Error creating order: ${error.message}` });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting orders by userId: ${error.message}` });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting all orders: ${error.message}` });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedData = req.body;
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: `Error updating order: ${error.message}` });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: `Error deleting order: ${error.message}` });
  }
};

const postOrderByAdminId = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    if (isAdmin(adminId)) {
      const orderData = req.body;
      orderData.adminId = adminId;
      const newOrder = new OrderModel(orderData);
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } else {
      res
        .status(403)
        .json({ error: "User is not authorized to create orders." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error creating order by admin: ${error.message}` });
  }
};

export default {
  addOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrder,
  deleteOrder,
  postOrderByAdminId,
};
