// Import the required modules
import AddressModel from "../models/AddressModel.js";

// Create an address
const createAddress = async (req, res) => {
  try {
    const newAddress = new AddressModel(req.body);
    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get addresses by userId
const getAddressesByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Retrieve addresses by userId
    const addresses = await AddressModel.find({ userId });

    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete an address by userId
const deleteAddressByUserId = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    // Validate userId and addressId
    if (!userId || !addressId) {
      return res.status(400).json({
        message: "Both User ID and Address ID are required for deletion.",
      });
    }

    // Find and delete the address by userId and addressId
    const deletedAddress = await AddressModel.findOneAndDelete({
      userId,
      _id: addressId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found for the specified user." });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      deletedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update an address by userId
const updateAddressByUserId = async (req, res) => {
  try {
    const { userId, addressId, ...updateData } = req.body;

    // Validate userId and addressId
    if (!userId || !addressId) {
      return res.status(400).json({
        message: "Both User ID and Address ID are required for update.",
      });
    }

    // Find and update the address by userId and addressId
    const updatedAddress = await AddressModel.findOneAndUpdate(
      { userId, _id: addressId },
      updateData,
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found for the specified user." });
    }

    res.status(200).json({
      message: "Address updated successfully",
      updatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the address controllers
export default {
  createAddress,
  getAddressesByUserId,
  deleteAddressByUserId,
  updateAddressByUserId,
};
