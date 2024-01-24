// Import the required modules
import AdminModel from "../models/AdminModel.js";

// Create a controller function for getting all orders
const getAllOrders = async (req, res) => {
  try {
    // Get the admin id from the params
    const { adminId } = req.params;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send all orders as a response
    res.status(200).json({ orders: admin.orders });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for getting an order by ID
const getOrderById = async (req, res) => {
  try {
    // Get the admin id and order id from the params
    const { adminId, orderId } = req.params;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the order by ID
    const order = admin.orders.find((order) => order._id == orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send the order as a response
    res.status(200).json({ order });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for creating a new order
const createOrder = async (req, res) => {
  try {
    // Get the admin id from the params
    const { adminId } = req.params;

    // Get the order data from the body
    const orderData = req.body;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Add the order to the orders array
    admin.orders.push(orderData);

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for updating an order
const updateOrder = async (req, res) => {
  try {
    // Get the admin id and order id from the params
    const { adminId, orderId } = req.params;

    // Get the updated order data from the body
    const updatedOrder = req.body;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the index of the order in the orders array
    const orderIndex = admin.orders.findIndex((order) => order._id == orderId);

    // Check if the order exists
    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order in the orders array
    admin.orders[orderIndex] = { ...admin.orders[orderIndex], ...updatedOrder };

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for deleting an order
const deleteOrder = async (req, res) => {
  try {
    // Get the admin id and order id from the params
    const { adminId, orderId } = req.params;

    // Find the admin by id
    const admin = await findById(adminId);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the index of the order in the orders array
    const orderIndex = admin.orders.findIndex((order) => order._id == orderId);

    // Check if the order exists
    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Remove the order from the orders array
    admin.orders.splice(orderIndex, 1);

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controller functions
export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
