import jwt from "jsonwebtoken";
import user from "../models/user.models.js";
import dotenv from "dotenv";

dotenv.config()
export const protectRoute = async(req,res,next)=>{
    try{
        console.log("Incoming cookies:", req.cookies);
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }

        const users = await user.findById(decoded.userId).select("-password")

        if(!users){
            return res.status(404).json({message:"User not found"});
        }
        req.user = users;
        next()
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
}