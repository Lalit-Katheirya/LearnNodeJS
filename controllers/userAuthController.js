
import expressAsyncHandler from "express-async-handler"
import User from "../Models/userModel.js"
import bcrypt from "bcryptjs"
import { generateJWTtoken } from "../middleware/authMiddleware.js"
import pool from "../db/sqlConfig.js"






// Register new user

const registerUser = expressAsyncHandler(async(req,res)=>{
// Step 1: Extract user data from request body
    const {
    firstName,
    lastName,
    email,
    phone,
    password
  } = req.body;

// Step 2: Check  all required fields are provided
    if (!firstName || !lastName || !email || !phone || !password) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

// Step 2: Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (userExists.length > 0) {
    res.status(400);
    throw new Error('User already exists');
    }

    // Hash the password before storing it in the database
   const password_hash = await bcrypt.hash(password, 10);


  if (userExists.length === 0) {
    // Step 3: Create new user
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, password_hash]
    );

    const user = await pool.query('SELECT * FROM users WHERE id = ?', [newUser.insertId]);


    console.log(user[0])

    res.status(201).json({
      _id: user[0]._id,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      email: user[0].email,
      phone: user[0].phone,
      token: generateJWTtoken(user[0]._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }





   res.json({message:"registration"})
})












// Get user details
const usersDetails = expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    res.json({message:"users"})
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