import Contactus from "../models/ContactusModel.js";

const ContactusController = {
  createContactus: async (req, res) => {
    try {
      const { name, price, image } = req.body;

      // Validate if required fields are present in the request body
      if (!name || !price || !image) {
        return res
          .status(400)
          .json({ message: "Name, price, and image are required fields" });
      }

      const newContactus = new Contactus({
        name,
        price,
        image,
      });

      await newContactus.save();

      res
        .status(201)
        .json({ message: "Contactus item created successfully", newContactus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllContactus: async (req, res) => {
    try {
      const allContactus = await Contactus.find();

      res.status(200).json(allContactus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default ContactusController;
