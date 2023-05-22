import express from "express";
import postController from '../controllers/postController.mjs';
import connectEnsureLogin from "connect-ensure-login";

const router = express.Router();

// This section will help you get a list of all the posts.
router.get("/", postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/', connectEnsureLogin.ensureLoggedIn(), postController.createPost);
router.patch('/:postId', connectEnsureLogin.ensureLoggedIn(), postController.updatePost);
router.delete('/:postId', connectEnsureLogin.ensureLoggedIn(), postController.deletePost);

export default router;