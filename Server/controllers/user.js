const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-chats')
        if (users.length <= 0) {
            res.status(404).json({ message: 'There was no user found in the database' })
            return;
        }

        res.status(200).json({ message: users })
    } catch (error) {
        next(error)
    }
}


const registerUser = async (req, res, next) => {
    try {
        const { user_name, email, password } = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).json({ message: 'account has been created, you can signup' })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const new_user = new User({ user_name, email, password: hashPassword })
        await new_user.save()

        const token = jwt.sign({
            userId: new_user._id,
            email: new_user.email
        }, process.env.TOKEN_KEY, { expiresIn: "30min" })
        res.status(201).json({ message: "user is created successfully", token })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { user_name, password } = req.body
        const userExist = await User.findOne({ user_name })

        if (!userExist) {
            res.status(400).json({ message: "account is not available, you can create an account" })
            return
        }
        const passwordIsCorrect = bcrypt.compareSync(password, userExist.password)

        if (!passwordIsCorrect) {
            res.status(400).json({ message: "credentials that you provide is not correct" })
            return;
        }

        const token = jwt.sign({
            userId: userExist._id,
            email: userExist.email
        }, process.env.TOKEN_KEY, { expiresIn: "30min" })
        res.status(200).json({ message: "User is login successfully", token })
    } catch (error) {
        next(error)
    }
}

const editProfile = async (req, res, next) => {
    try {
        const {id} = req.params
        const {user_name: newUserName, profile_img } = req.body;

        const userWithNewName = await User.findOne({ user_name: newUserName });

        if (userWithNewName && userWithNewName._id !== id) {
            return res.status(400).json({ message: `User with the name ${newUserName} already exists. Please choose another user_name.` });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { user_name: newUserName, profile_img }, { new: true }).select('-chats');

        if (!updatedUser) {
            return res.status(404).json({ message: `User with id ${id} not found.` });
        }

        res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });

    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUser, registerUser, loginUser, editProfile }