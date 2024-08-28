import mongoose from "mongoose";

let userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male" , "female" ]
    },
    photo:{
        type:String,
        default:""
    }


} , {timestamps:true} )

export const User = mongoose.model("User",userSchema);