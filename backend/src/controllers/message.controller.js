import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";


export const getUsersList = async (req, res) => {
    //This function is used to fetch the list of users except the logged in user 
    try {
        const loggedInUser = req.user._id;
        const otherUsers = await User.find({_id: {$ne: loggedInUser} }).select("-password") //Filter all users and their details (except pwd) except logged in user

        res.status(200).json(otherUsers); 
    } catch (error) {
        console.error("Error in getUsersList: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const selectedUserId = req.params.id;
        
        const messages = Message.find({
            $or: [
                { senderId: loggedInUser, receiverId: selectedUserId },
                { senderId : selectedUserId, receiverId: loggedInUser}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const {text, image} = req.body;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text, 
            image: imageUrl
        })

        await newMessage.save();

        res.status(201).json(newMessage)
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}