import mongoose from "mongoose";


let conversationSchema = new mongoose.Schema({

     participants :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],

    messages:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:"Message",
          default:[], // make it default as conversation with participant will be crerated 
          // and push meaasges later on
    }],

} ,
{timestamps:true} )


export const Conversation = mongoose.model( "Conversation" , conversationSchema );