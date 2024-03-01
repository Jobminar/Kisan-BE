import Contact from "../models/contactModel.js";

const contactController = {
  createContacts: async (req, res) => {
    try {
      const { name, email, mobile, message } = req.body;

      // Check if all required fields are present in the request body
      if (!name || !email || !mobile || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Mobile number validation using a simple regex
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: "Invalid mobile number format" });
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
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
};

export default contactController;
