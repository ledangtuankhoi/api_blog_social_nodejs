import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser,
} from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const userRoutes = express.Router();

userRoutes.get('', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/register', register);
userRoutes.post('/login', login);

export { userRoutes };