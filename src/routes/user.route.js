import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser, unfollow, follow, getFriends
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
userRoutes.put('/follow/:id', auth, follow);
userRoutes.put('/unfollow/:id', auth, unfollow)
userRoutes.get('/getFriends/:id', auth, getFriends);

export { userRoutes };
