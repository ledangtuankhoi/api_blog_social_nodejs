import User from '../models/user.model.js';


export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const createUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email : req.body.email,
        password : req.body.password,
        bio : req.body.bio,
        isAdmin : req.body.isAdmin,
        website : req.body.website,
        work : req.body.work,
        city : req.body.city,
        country : req.body.country,
        github_link : req.body.github_link,
        linkedin_link : req.body.linkedin_link,
        facebook_link : req.body.facebook_link
    });
    try {
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
        // console.log(error)
    }
}
