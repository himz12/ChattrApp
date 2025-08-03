import bcrypt from 'bcryptjs'
import user from '../models/user.models.js'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudnary.js';

export const signup = async (req,res)=>{
    const { fullName, email, password } = req.body;
    try{
        
        if(!fullName || !password || !email){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const users = await user.findOne({email})
        if (users) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10)
        const hasedPass = await bcrypt.hash(password,salt)

        const newUser = new user({
            fullName,
            email,
            password:hasedPass
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }
        else{
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch(error){
        console.log("error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const users = await user.findOne({email})
        if(!users) return res.status(400).json({message:"Invalid Credentials"})
        
        const isPass = await bcrypt.compare(password,users.password)

        if(!isPass) {
            return res.status(400).json({message:"Invalid Credentials"})
        }
        generateToken(users._id,res)

        res.status(200).json({
            _id:users._id,
            fullName:users.fullName,
            email:users.email,
            password:users.password,
            profilePic:users.profilePic
        })
    }catch(error){
        console.log("Error in controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"})
    }catch(error){
        console.log("Error in controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const updateProfilePic = async (req,res) =>{
    try{
        const {profilePic} = req.body;
        const userId=req.user._id

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"})
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic)
        const updateUser = await user.findByIdAndUpdate(userId,{profilePic:uploadRes.secure_url},{new:true})
        res.status(200).json(updateUser)
    }catch(error){
        console.log("Error in uploadin profile pic: ",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const checkAuth = (req,res) =>{
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log("error in check auth: ",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}