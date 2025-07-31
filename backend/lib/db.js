import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL );
        console.log("Mongo Db connected : ",conn.connection.host);
    }
    catch(error){
        console.log("Mongo DV error : ",error)
    }
};