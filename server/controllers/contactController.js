import ContactUs from "../models/contactUs.js";

// Controller logic for handling new contact form submissions
const createContactMessage = async (req, res) => {
  try {
    const newContactMessage = await ContactUs.create(req.body);
    res.status(201).json(newContactMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller logic for retrieving all contact form submissions
const getAllContactMessages = async (req, res) => {
  try {
    const allContactMessages = await ContactUs.find();
    res.status(200).json(allContactMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { createContactMessage, getAllContactMessages };
