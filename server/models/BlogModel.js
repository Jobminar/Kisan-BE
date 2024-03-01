import { Schema, model } from "mongoose";
const BlogSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});
const Blog = model("Blog", BlogSchema);
export default Blog;
