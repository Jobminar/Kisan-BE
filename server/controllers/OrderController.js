import OrderModel from "../models/OrderModel.js"; // Update the path
import CartModel from "../models/CartModel.js";
import AddressModel from "../models/AddressModel.js";
import fs from "fs";
// Create a new order
// You can customize this based on your file storage needs
// const createOrder = async (req, res) => {
//   try {
//     console.log("Received POST request to create a new order:", req.body);

//     const {
//       userId,
//       payment,
//       paymentId,
//       price,
//       orderStatus,
//       addressId,
//       currentDate,
//       cartIds,
//       count,
//     } = req.body;

//     // Validate the incoming data
//     if (
//       !userId ||
//       !payment ||
//       !paymentId ||
//       !price ||
//       !addressId ||
//       !currentDate ||
//       !cartIds ||
//       !count
//     ) {
//       console.error("Invalid request data.");
//       return res.status(400).json({ error: "Invalid request data" });
//     }

//     let imageBuffer;

//     if (req.body.imageBuffer) {
//       console.log("Using imageBuffer provided in the request.");
//       imageBuffer = req.body.imageBuffer;
//     } else if (req.body.base64Image) {
//       console.log("Using base64Image provided in the request.");
//       imageBuffer = Buffer.from(req.body.base64Image, "base64");
//     } else {
//       console.log("No image data provided. Using defaultImage.jpg.");
//       imageBuffer = fs.readFileSync("defaultImage.jpg");
//     }

//     // Convert the imageBuffer to a base64 string
//     const itemImageBase64 = imageBuffer.toString("base64");

//     const newOrder = new Order({
//       userId,
//       payment,
//       paymentId,
//       price,
//       orderStatus: orderStatus || "pending",
//       addressId,
//       currentDate,
//       cartIds,
//       itemImage: itemImageBase64,
//       count,
//     });

//     console.log("Saving the order to the database...");

//     // Save the order to the database
//     const savedOrder = await newOrder.save();

//     console.log("Order successfully saved:", savedOrder);

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createOrder = async (req, res) => {
  try {
    console.log("Received POST request to create a new order:", req.body);

    const {
      userId,
      // payment,
      // paymentId,
      // price,
      // orderStatus,
      // addressId,
      // currentDate,
      // cartIds,
      // count,
    } = req.body;

    // Validate the incoming data
    if (
      !userId
      // !payment ||
      // !paymentId ||
      // !price ||
      // !addressId ||
      // !currentDate ||
      // !cartIds ||
      // !count
    ) {
      console.error("Invalid request data.");
      return res.status(400).json({ error: "Invalid request data" });
    }

    // let imageBuffer;

    // if (req.body.imageBuffer) {
    //   console.log("Using imageBuffer provided in the request.");
    //   imageBuffer = req.body.imageBuffer;
    // } else if (req.body.base64Image) {
    //   console.log("Using base64Image provided in the request.");
    //   imageBuffer = Buffer.from(req.body.base64Image, "base64");
    // } else {
    //   console.log("No image data provided. Using defaultImage.jpg.");
    //   imageBuffer = fs.readFileSync("defaultImage.jpg");
    // }

    // // Convert the imageBuffer to a base64 string
    // const itemImageBase64 = imageBuffer.toString("base64");

    const newOrder = new OrderModel({
      userId,
      // payment,
      // paymentId,
      // price,
      // orderStatus: orderStatus || "pending",
      // addressId,
      // currentDate,
      // cartIds,
      // itemImage: itemImageBase64,
      // count,
    });

    console.log("Saving the order to the database...");

    // Save the order to the database
    const savedOrder = await newOrder.save();

    console.log("Order successfully saved:", savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
