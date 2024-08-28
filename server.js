 
 import express from 'express' // avoid require
 import dotenv from 'dotenv'  // use type:"module" in package.json
 import authRouter from './routes/auth.route.js'
 import messageRouter from './routes/messageRouter.js'
 import userRouter from './routes/users.router.js'
 import morgan from 'morgan';
import { connectToMongodb } from './db/connectTomongodb.js';
import { app, server } from './socket/socket.js'
import cors from "cors";
 
 app.use(express.json());
   app.use(morgan("dev")); //for diplaying request
   dotenv.config(); // for env setup  files 
   
app.use(cors())

   

 const PORT = process.env.PORT  ;




 app.use( "/api/auth" , authRouter ) ; // authentication
 app.use( "/api/messages" , messageRouter ) ; // mantain conversation 
 app.use( "/api/users" , userRouter ) ; // get users except me 

 

 server.listen(PORT , ()=>{
  connectToMongodb();
  console.log(`server running in : http://localhost:${PORT}`);

 })






 {/* 
for frontend vite gives bundler

// npm install express mongoose dotenv jsonwebtoken cookie-parser bcryptjs
for backend create the structure  
add a variable in script  to run 
 
"server":"nodemon backend/server.js"  
"start":"node backend/server.js" 
 npm run server

 nodemon:when u update file u need to reRUN the server  .. for production only

 so add npm install nodemon --save-dev


 1)   setup env file  npm install dotenv   require('dotenv')   dotenv.config(;) 
 2)  structure with  router .. controller
 3)  introduce global catches for standard error handling in try cathes for custom error  { next(new error("mssg")) } ..catch(error){ next(error) }
 4)  setup mongodb

   1. create a new project in mongo account copy password .. get connection string.
   1.1 in connction string add /table as well
   2. connect our backend to the mongo projects connection string  by imort mongoose   ... mongoose.connect(string);
  5) export  await mongoose.Schema ... mongoose.model
*/}



{/*
     ?? D E P L O Y  B A C K E N D

     upload to git without  {  E  N  V  }   file  and   N O D E  M O D U L E S   add in .gitignore file  .env   /node_modules

     // node modules will downloaded seing to packegae  file 
    // so add in  { B U I L D }  Script in package  npm insatll      ...    npm run build
  
  
  */}