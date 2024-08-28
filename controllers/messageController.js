import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";
  //     / api / messages / 



  //    / api / messages / send 
export const sendController = async (req,res)=> {

try {

    let { message } = req.body ;

    let receiverId  =  req.query.receiverId ;

    let senderId = req.query.senderId ;
    if(!senderId || !receiverId){
    return  res.status(400).json( { error:"no sender reciver IDs"});
    }

    let conversation = await Conversation.findOne ( {
       participants : { $all:[ senderId , receiverId] } 
      }) ;  // find old conversation


    if ( !conversation ) {
      conversation = await Conversation.create({participants:[senderId, receiverId]} ); // new conversation

    }

    let createdMessage = await Message.create( {senderId , receiverId , message} );


     conversation.messages.push(createdMessage._id ) ;
     await conversation.save() ;

     const receiverSocketId = getRecieverSocketId( receiverId ) ;

     if (  receiverSocketId  ) {

      io.to ( receiverSocketId ).emit( "newMessage" , createdMessage )  ;

     }



  res.status(201).json({createdMessage}) ;


} catch (error) {

    console.log( "error occured in send Messages  : "  ,  error.message ) ;

    res.status(500).json( { error:"internal server error"});
    
}
}

export const getMessagesController= async (req,res)=>{
   try { // api/messages?senderId=""&receiverId=""

    let receiverId  =  req.query.receiverId ;

    let senderId = req.query.senderId ;
    if(!senderId || !receiverId){
      return  res.status(400).json( { error:"no sender reciver IDs"});
      }

   

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId , receiverId]}
    }).populate("messages");  // replace array of ids to array of document refrencing to messages model

    if ( !conversation){
     return res.status(200).json({messages:[]});
    }
    res.status(200).json({messages:conversation.messages});

   } catch (error) {

    console.log( "error occured in get Messages  : "  ,  error.message ) ;

    res.status(500).json( { error:"internal server error"});
    
   }
}