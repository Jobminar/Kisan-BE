import BillDetailsModel from "../models/BillDetailsModel.js"; // Adjust the path based on your project structure

// Controller to handle creating a new bill details entry
const createBillDetails = async (req, res) => {
  try {
    const { MRP, deliveryCharge, total } = req.body;
    const newBillDetails = new BillDetailsModel({ MRP, deliveryCharge, total });
    const savedBillDetails = await newBillDetails.save();
    res.status(201).json(savedBillDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all bill details entries
const getAllBillDetails = async (req, res) => {
  try {
    const billDetails = await BillDetailsModel.find();
    res.status(200).json(billDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a specific bill details entry by ID
const getBillDetailsById = async (req, res) => {
  try {
    const billDetails = await BillDetailsModel.findById(req.params.id);
    if (!billDetails) {
      return res.status(404).json({ error: "Bill details not found" });
    }
    res.status(200).json(billDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a specific bill details entry by ID
const updateBillDetailsById = async (req, res) => {
  try {
    const updatedBillDetails = await BillDetailsModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBillDetails) {
      return res.status(404).json({ error: "Bill details not found" });
    }
    res.status(200).json(updatedBillDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a specific bill details entry by ID
const deleteBillDetailsById = async (req, res) => {
  try {
    const deletedBillDetails = await BillDetailsModel.findByIdAndRemove(
      req.params.id
    );
    if (!deletedBillDetails) {
      return res.status(404).json({ error: "Bill details not found" });
    }
    res.status(200).json(deletedBillDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createBillDetails,
  getAllBillDetails,
  getBillDetailsById,
  updateBillDetailsById,
  deleteBillDetailsById,
};
