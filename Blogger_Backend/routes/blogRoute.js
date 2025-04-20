import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth.js'; 
// import { createBlog, deleteBlog, getUserBlog, getOneBlog, updateBlog, getAllBlogs, getLimitBlogs, getFilteredBlogs} from '../controllers/blog';
import { createBlog} from '../controllers/blog/createBlog.js';
import { deleteBlog} from '../controllers/blog/deleteBlog.js';
import { getUserBlog} from '../controllers/blog/getUserBlog.js';
import { getOneBlog} from '../controllers/blog/getOneBlog.js';
import { updateBlog} from '../controllers/blog/updateBlog.js';
import { getAllBlogs} from '../controllers/blog/getAllBlogs.js';
import { getLimitBlogs} from '../controllers/blog/getLimitBlogs.js';
import { getFilteredBlogs} from '../controllers/blog/getFilteredBlogs.js';
// import { getFilteredBlogs} from '../controllers/blog/getFilteredBlogs.js';

router.post('/createblog', verifyToken, createBlog);
router.get('/bloguser/:location/:search',verifyToken, getUserBlog);
router.get('/blogsingle/:id', getOneBlog);
router.put('/blogupdate/:id', verifyToken, updateBlog);
router.delete('/blogdelete/:id', verifyToken, deleteBlog);
router.get('/allblogs', getAllBlogs);
router.get('/filteredblogs/:location/:search', getFilteredBlogs);
router.get('/blogs/:location/:search/:limit', getLimitBlogs);

export default router;