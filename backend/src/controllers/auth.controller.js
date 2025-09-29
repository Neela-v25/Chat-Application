import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from '../lib/cloudinary.js'

export const signup = async (req, res) => {
    const {username, fullName, password} = req.body;
    console.log("Body: ", req.body)
    try{
        // hash password and create a token to authenticate the user
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"})
        }

        if(!username || !fullName || !password){
             return res.status(400).json({message: "Fields marked with * are required"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({message: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            fullName,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
            //res.status(200).json({message: "User created succesfully"})
        } else{
            return res.status(400).json({message: "Invalid User data"})
        }
    }catch(err){
        return res.status(500).json({message: "Internal error"})
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    try{
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
        } 

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    }catch(err){
        return res.status(500).json({message: "Internal error"})
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        res.status(400).json({message: "Internal Error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.bosy;
        const userId = req.user._id //since we have added the id in the protectroute

        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json('Internal error')
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}