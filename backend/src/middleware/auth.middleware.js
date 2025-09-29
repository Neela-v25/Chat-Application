import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//this function is used to authenticate the user to perform any further action
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token; //token is the name we have given to stor the cookies
        if(!token){
            return res.status(400).json({message: "Unauthorised user - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode the jwt token to get the user id and so on

        if(!decoded){
            return res.status(400).json({message: "Unauthorised user - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password"); //find if the user is present in db, extract all the details except the password

        if(!user) {
            return res.status(400).json({message: "User not found"})
        }

        req.user = user; //once user is found in the db, add it to the request and call the next function
        next();


    } catch (error) {
        return res.status(500).json({message: "Internal error"})
    }
}