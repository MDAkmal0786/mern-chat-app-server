import { User } from "../models/user.model.js";


export const userController=async(req,res)=>{

    try {

         let senderId = req.query.userId ;
         let searchName = req.query.searchName ;

         if(!senderId ) {
          return  res.status(400).json( { error:"no sender ID"} ) ;
          }

         let users ;

          if ( !searchName){
            users = await User.find( {_id:{$ne:senderId}} ).select("-password") ;
          }
          else{
            users = await User.find( {  _id:{$ne:senderId} , name:{$regex:searchName , $options:"i" }  } ).select( "-password" ) ;
                   
          }

         res.status(201).json( { users } ) ;
    } 
    catch (error) {
        console.log ( "error occured in getting USERS  : "  ,  error.message ) ;

        res.status(500).json( { error:"internal server error"} ) ;
    }

}