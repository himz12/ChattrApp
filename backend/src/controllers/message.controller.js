import user from "../models/user.models.js"
import message from "../models/msg.models.js"
import cloudinary from "../lib/cloudnary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggeduserID = req.user._id
        const filteredUsers = await user.find({ _id: { $ne: loggeduserID } }).select('-password');
        res.status(200).json(filteredUsers);

    }
    catch(error){
        console.error('Error in getuserid: ',error.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await message.find({
            $or:[
                {senderId:myId,recieverId:userToChatId},
                {senderId:userToChatId , recieverId:myId}
            ]
        });

        res.status(200).json(messages)
    }catch(error){
        console.error('Error in getMessages: ',error.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const sendMessages = async(req,res)=>{
    try{
        const {text,image} = req.body;
        const {id:recieverId}=req.params;
        const senderId = req.user._id;

        let imgUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imgUrl = uploadResponse.secure_url;
        }

        const newMessage = new message({
            senderId,
            recieverId,
            text,
            image:imgUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)

        const receiverSocketId = getReceiverSocketId(recieverId);
            if (receiverSocketId) {
              io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        
        res.status(201).json(newMessage);
    }catch(error){
        console.error('Error in sendmsg: ',error.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}