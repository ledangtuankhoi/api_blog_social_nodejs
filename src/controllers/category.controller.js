import Category from '../models/category.model.js';

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.send(category)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.send(category)
    } catch (error) {
        res.send(404).json(error)
    }
}

export const createCategory = async (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    });
    try {
        const result = await newCategory.save()
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send('Create category unsuccessful!')
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            res.status(400).send('Invalid Category Id');
        }

        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success: true,
            message : 'The category is deleted!'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error
        })
    }
}

