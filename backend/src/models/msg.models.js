import mongoose from "mongoose";

const msgSc = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        recieverId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        text:{
            type:String
        },
        image:{
            type:String
        },
    },{timestamps:true}
)

const message = mongoose.model("Message",msgSc);

export default message;