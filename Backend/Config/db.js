import mongoose from "mongoose";
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.mongoURI);
        console.log("Database connected successfully");
    }
    catch(error){
        console.error("Database connection failed");
        console.error(error);
    }
}
export default connectdb;