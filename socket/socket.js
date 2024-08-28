import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

// make a socket server on th etop of express s erver

const app = express() ;
const server = http.createServer( app ) ;
const io = new Server( server , {
    cors : {
        origin : ["http://localhost:3000"] ,
        methods : [ "GET" , "POST" ]
    }
} ) ;

const userSocketMap={};//{userId:socketId}

export const getRecieverSocketId =(receiverId)=>{
    
   return userSocketMap[receiverId]

} ;

io.on('connection' , ( socket )=>{ // socket is user infor 

    console.log("a user connected" , socket.id )   
      // connection event . whenever client is connected he gives his user id as weel for userolone
    // so th at we can tell   A .  L  . L  .   users about that that login GUY

const userId = socket.handshake.query.userId ;  


if ( userId != "undefined" ) {
    userSocketMap[userId]=socket.id;

}

io.emit( "getOnlineUsers" , Object.keys(userSocketMap));//to all clients



    socket.on("disconnect", ()=>{  // listen to disconnect event

        console.log("user disconnected" , socket.id ) 
        delete userSocketMap[userId];
        io.emit( "getOnlineUsers" , Object.keys(userSocketMap)) 
    } )

}
)




export { app , server , io }



// socket.io  Allows bidirectional commmuniaction between client and the server for real time application

// .emit  send messages
//io.to(socketId).emit // message to certain client
// socket.on to listen to events for both  c l i e n t  and  s e r v e r
//socket.off()    to not  listen event