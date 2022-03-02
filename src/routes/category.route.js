import express from "express";
import {
    getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory
} from "../controllers/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.get('', getAllCategory);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('', createCategory);
categoryRoutes.put('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

export { categoryRoutes };