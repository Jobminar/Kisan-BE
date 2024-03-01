import Contact from "../models/contactModel.js";

const contactController = {
  createContacts: async (req, res) => {
    try {
      const { name, email, mobile, message } = req.body;

      // Create a new contact using the Contact model
      const newContact = new Contact({
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        message: message || "",
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
