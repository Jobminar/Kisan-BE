import Contact from "../models/contactModel.js";

const contactController = {
  createContact: async (req, res) => {
    try {
      const { name, email, mobile, message } = req.body;

      // Check if all required fields are present in the request body
      if (!name || !email || !mobile || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Create a new contact using the Contact model
      const newContact = new Contact({
        name,
        email,
        mobile,
        message,
      });

      // Save the contact to the database
      await newContact.save();

      res.status(201).json({ message: "Contact created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getContact: async (req, res) => {
    try {
      // Fetch all contacts from the database
      const contacts = await Contact.find();

      res.status(200).json({ contacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default contactController;
