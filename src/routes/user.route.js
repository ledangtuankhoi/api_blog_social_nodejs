import express from "express";
import {
    getAllUser, getUserById, createUser
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get('', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', createUser);

export { userRoutes };