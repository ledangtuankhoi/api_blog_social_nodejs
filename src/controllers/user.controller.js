import mongoose from 'mongoose';
import User from '../models/user.model.js';


export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getUserById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        bio: req.body.bio,
        isAdmin: req.body.isAdmin,
        website: req.body.website,
        work: req.body.work,
        city: req.body.city,
        country: req.body.country,
        github_link: req.body.github_link,
        linkedin_link: req.body.linkedin_link,
        facebook_link: req.body.facebook_link,
    });
    try {
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateUser = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid User Id');
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            isAdmin: req.body.isAdmin,
            website: req.body.website,
            work: req.body.work,
            city: req.body.city,
            country: req.body.country,
            github_link: req.body.github_link,
            linkedin_link: req.body.linkedin_link,
            facebook_link: req.body.facebook_link
        })
        res.status(200).json({
            success: true,
            message: 'The user is updated!'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }

}

export const deleteUser = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, message: 'The user is deleted' })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

}

export const follow = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body._id);
        if (!user.followers.includes(req.body._id)) {
            await user.updateOne({
                $push: {
                    followers: req.body._id
                }
            })
            await currentUser.updateOne({
                $push: {
                    followings: req.params.id
                }
            })
            return res.status(200).json({
                success: true,
                message: "User has been followed"
            })
        } else {
            return res.status(403).json({
                success: false,
                message: "You already follow this user!"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

export const unfollow = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body._id);
        if (user.followers.includes(req.body._id)) {
            await user.updateOne({
                $pull: {
                    followers: req.body._id
                }
            });
            await currentUser.updateOne({
                $pull: {
                    followings: req.params.id
                }
            })
            return res.status(200).json({
                success: true,
                message: "User has been unfollowed!"
            })
        } else {
            return res.status(403).json({
                success: false,
                message: "You don't follow this user"
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//get friends
export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, avatar } = friend;
            friendList.push({
                _id, username, avatar
            });
        })
    } catch (error) {
        res.status(500).json(error)
    }
}