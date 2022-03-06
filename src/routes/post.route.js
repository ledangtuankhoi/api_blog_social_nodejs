import express from "express";
import {
    searchPost,
    getAllPost, getPostById, createPost, updatePost, deletePost
} from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.get('', getAllPost);
postRoutes.get('/:id', getPostById);
postRoutes.post('', createPost);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

postRoutes.get('/search/:key', searchPost);

export { postRoutes };