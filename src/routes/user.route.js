import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser, unfollow, follow
} from "../controllers/user.controller.js";
import { login, register , refreshToken} from "../controllers/auth.controller.js";

import auth  from "../middlewares/middlewares.js";

const userRoutes = express.Router();

userRoutes.get('', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', createUser);
userRoutes.put('/:id', auth ,updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/refreshToken', refreshToken);
userRoutes.put('/:id/follow', follow);
userRoutes.put('/:id/unfollow', unfollow)

export { userRoutes };
