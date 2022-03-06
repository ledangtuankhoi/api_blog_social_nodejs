import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;

    let NewUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
    });
    try {
        const user = await NewUser.save()
        res.status(201).json({
            success: true,
            message: 'The user is registered!',
            data: user
        })
    } catch (error) {
        res.status(400).send("The user cannot be register")
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message:"Invalid Email"
            })
        }
        const secret = process.env.secret;
        const password = req.body.password
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

        if (user && validPass) {
            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: "10d"}
            )
            
            res.status(200).send({ user: user.email, token: token })
        } else {
            return res.status(400).send('Password is wrong!')
        }

    } catch (error) {
        res.status(400).send("The user not found").json({ error: error })
        console.log(error)
    }
}