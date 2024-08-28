import express from 'express'
import { loginController, signupController } from '../controllers/authcontroller.js';


let router = express.Router() ;

  //    /api/auth/

router.post("/signup" , signupController ) ;
router.post("/login" ,  loginController) ;


export default router