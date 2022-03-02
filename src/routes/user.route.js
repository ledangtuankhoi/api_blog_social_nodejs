import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get('', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export { userRoutes };