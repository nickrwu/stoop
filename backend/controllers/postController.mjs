import Post from '../models/postSchema.mjs';

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
    }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
};

// Create a new post
const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body); 
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
};

// Update an existing post
const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = await Post.findByIdAndUpdate(postId, ... req.body, { new: true });
        if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found.' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found.' });
        }
        res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
};

// Export the controller functions
export default {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};