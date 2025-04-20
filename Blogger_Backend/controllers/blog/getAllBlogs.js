import { Blog } from '../../models/blog.js';

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
        throw new Error(error);
    }
};