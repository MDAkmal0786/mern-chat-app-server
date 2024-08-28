
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signupController = async (req,res)=>{
   try {

    let {name , username , password , gender , confirmPassword} = req.body;


    if ( !name || !username || !password || !gender || !confirmPassword){
      return  res.status(400).json({error:"fill all fields"});
    }


     let user = await User.findOne({username}) ;

     if ( user ) {
      return  res.status(400).json( {error:"user Exist"} ) ;
     }
     
     if ( password != confirmPassword  ) {
        return  res.status(400).json({error:"password dont match"});
       }
       if ( password.length < 6  ) {
        return  res.status(400).json({error:"password should be atleast 6 digits "});
       }

       let boyPhoto  = `https://avatar.iran.liara.run/public/boy?username=${username}`;
       let girlPhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

       let photo = gender==="male"?boyPhoto:girlPhoto;

       let salt = await bcrypt.genSalt(10); // hash password in consistent way
       let hashedPassword = await bcrypt.hash(password , salt) ;  


       let newUser = await User.create( {name , username , password:hashedPassword , gender , photo} ) ;

       // get token and get it in  R e s p o n s e    as   res.cookie : { jwt : 56789 }

   res.status(201).json({
    _id:newUser._id,
    name:newUser.name,
    username:newUser.username,
    photo:newUser.photo

   });
   } catch (error) {
    console.log("error occured in signup  : " , error.message)

    res.status(500).json( { error:"internal server error"});
    
   }
}



export const loginController = async(req,res)=>{
    try {

      let {username , password} = req.body;
      

      if ( !username || !password ) {
        return  res.status(400).json({error:"fill all fields"});
      }
      let user = await  User.findOne({username});

      if ( !user){
        return  res.status(400).json({error:"Wrong username"});

      }
      let isPasswordCorrect = await bcrypt.compare(password , user.password); // hash comapred with hashvallues
      if ( !isPasswordCorrect){
        return  res.status(400).json({error:"Wrong password"} ) ;

      }

    

 res.status(200).json({
    _id:user._id,
    name:user.name,
    username:user.username,
    photo:user.photo

   });
    } catch (error) {

      console.log("error occured in login  : " , error.message)

      res.status(500).json( { error:"internal server error"});
      
    }
}
