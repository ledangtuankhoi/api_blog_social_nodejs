import express from "express";
import {
    getAllPost, getPostById, createPost, updatePost, deletePost
} from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.get('', getAllPost);
postRoutes.get('/:id', getPostById);
postRoutes.post('', createPost);
postRoutes.put('/:id', updatePost);
postRoutes.delete(':/id', deletePost);

export { postRoutes };