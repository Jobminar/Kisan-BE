// Import the SelectAddressModel
import SelectAddressModel from "../models/SelectAddressModel.js";

// Create a controller function for adding a new address
const addAddress = async (req, res) => {
  try {
    // Get the address details from the request body
    const {
      userId,
      title,
      apartments,
      address,
      city,
      streetNoOrName,
      state,
      country,
      PINCODE,
    } = req.body;

    // Create a new address document
    const newAddress = new SelectAddressModel({
      userId,
      title,
      apartments,
      address,
      city,
      streetNoOrName,
      state,
      country,
      PINCODE,
    });

    // Save the new address to the database
    await newAddress.save();

    // Send a success response
    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for updating an address by ID
const updateAddress = async (req, res) => {
  try {
    // Get the address ID from the request parameters
    const { userId } = req.params;

    // Get the updated address details from the request body
    const updatedAddress = req.body;

    // Find the address by ID and update it
    const result = await SelectAddressModel.findByIdAndUpdate(
      userId,
      updatedAddress,
      { new: true }
    );

    // Check if the address was found and updated
    if (!result) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for deleting an address by ID
const deleteAddress = async (req, res) => {
  try {
    // Get the address ID from the request parameters
    const { userId } = req.params;

    // Find the address by ID and delete it
    const result = await SelectAddressModel.findByIdAndDelete(addressId);

    // Check if the address was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a controller function for getting an address by ID
const getAddressById = async (req, res) => {
  try {
    // Get the address ID from the request parameters
    const { addressId } = req.params;

    // Find the address by ID
    const address = await SelectAddressModel.findById(addressId);

    // Check if the address was found
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Send the address as a response
    res.status(200).json({ address });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Export the controller functions
export default {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
};
