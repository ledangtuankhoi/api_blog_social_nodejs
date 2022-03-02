import express from "express";
import {
    getAllTag, getTagById, createTag, updateTag, deleteTag
} from "../controllers/tag.controller.js";

const tagRoutes = express.Router();

tagRoutes.get('', getAllTag);
tagRoutes.get('/:id', getTagById);
tagRoutes.post('', createTag);
tagRoutes.put('/:id', updateTag);
tagRoutes.delete('/:id', deleteTag);

export { tagRoutes };