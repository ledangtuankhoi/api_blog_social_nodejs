import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import Category from '../models/category.model.js';
import User from '../models/user.model.js';
import Tag from '../models/tag.model.js';

export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find()
        res.send(post);
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.send(post)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const createPost = async (req, res) => {
    const newPost = new Post({
        title : req.body.title,
        description : req.body.description,
        content : req.body.description,
        image : req.body.description,
        author : req.body.author,
        category : req.body.category,
        tags : req.body.tags,
    });
    try {
        const result = await newPost.save()
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Post Id');
    }
    try {
        const author = await User.findById(req.body.author); 
        if (!author) {
            return res.status(400).send('Invalid Author');
        }
        
        const category = await Category.findById(req.body.category); 
        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        const tags = await Tag.findById(req.body.tags); 
        if (!tags) {
            return res.status(400).send('Invalid Tags');
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).send('Invalid Post');
        }

        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            content: req.body.description,
            image: req.body.image,
            author: req.body.author,
            category: req.body.category,
            tags:req.body.tags
        })
        res.status(200).json({
            success: true,
            message: 'The post is updated!',
            data: updatePost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, message: 'The post is deleted'})
    } catch (error) {
        res.status(500).json({ success: false, error: error})
    }
}