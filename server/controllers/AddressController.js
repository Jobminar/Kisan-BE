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

// Get all addresses
const getAllAddresses = async (_req, res) => {
  try {
    const addresses = await AddressModel.find();
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get a single address by ID
const getAddressById = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the request body." });
    }

    // Retrieve the address by userId
    const address = await AddressModel.findOne({ userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update an address by ID
const updateAddressById = async (req, res) => {
  try {
    const updatedAddress = await AddressModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete an address by ID
const deleteAddressById = async (req, res) => {
  try {
    const deletedAddress = await AddressModel.findOneAndDelete({
      userId: req.body.userId,
    });
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      address: deletedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the address controllers
export {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
