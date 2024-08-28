import mongoose from "mongoose";



export const connectToMongodb = async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connnected to MongoDB")
    }
    catch(error){
        console.log("error connnecting to MongoDB" , error.message);

    }
}

