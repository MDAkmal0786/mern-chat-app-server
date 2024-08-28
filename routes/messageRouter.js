import express from 'express';
import { getMessagesController, sendController } from '../controllers/messageController.js';
let router = express.Router() ; 

router.post ( "/send"  , sendController ) ; // add messsage in our conversation wher we both are participants
router.get("/"  , getMessagesController ) ;                    // get our conversation messages  or []

export default router ;