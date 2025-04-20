import { Blog,  } from '../../models/blog.js';
import { User } from '../../models/user.js';

export const getOneBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const newId = id.replace(":", "");
        const singleBlog = await Blog.findById(newId);
        return res.status(200).json(singleBlog);
    } catch (error) {
        throw new Error(error);
    }
};   