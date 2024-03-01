import Blog from "../models/BlogModel.js";

const BlogController = {
  createBlog: async (req, res) => {
    try {
      const { name, price, image } = req.body;

      // Validate if required fields are present in the request body
      if (!name || !price || !image) {
        return res
          .status(400)
          .json({ message: "Name, price, and image are required fields" });
      }

      const newBlog = new Blog({
        name,
        price,
        image,
      });

      await newBlog.save();

      res
        .status(201)
        .json({ message: "Blog item created successfully", newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllBlog: async (req, res) => {
    try {
      const allBlog = await Blog.find();

      res.status(200).json(allBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default BlogController;
