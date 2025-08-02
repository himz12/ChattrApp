import mongoose from "mongoose";

const userSc = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
},{timestamps: true})

const user = mongoose.model("User",userSc)

export default  user;