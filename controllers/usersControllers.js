
import expressAsyncHandler from "express-async-handler"
import User from "../Models/userModel.js"
import { generateJWTtoken } from "../middleware/authMiddleware.js"




const usersDetails = expressAsyncHandler(async(req,res)=>{
    res.json({message:"users"})
})

const registerUser = expressAsyncHandler(async(req,res)=>{

  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

   res.json({message:"registration"})
})

const loginUser = expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    res.json({message:"login"})
})


const updateUser = expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    res.json({message:"update"})
})


const deleteUser = expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    res.json({message:"delete"})
})

export {registerUser,loginUser,updateUser,usersDetails,deleteUser}