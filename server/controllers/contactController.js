import Contact from "../models/contactModel.js";

const contactController = {
  createContacts: async (req, res) => {
    try {
      const { name, email, mobile, message } = req.body;

      // Create a new contact using the Contact model
      const newContact = new Contact({
        name: name || "", // Set to empty string if undefined
        email: email || "", // Set to empty string if undefined
        mobile: mobile || "", // Set to empty string if undefined
        message: message || "", // Set to empty string if undefined
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
