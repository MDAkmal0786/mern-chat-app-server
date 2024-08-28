import express from 'express';
import { userController } from '../controllers/userController.js';


let router = express.Router();

  //    /api/users
router.get("/"  , userController); // get all user except me 



export default router;