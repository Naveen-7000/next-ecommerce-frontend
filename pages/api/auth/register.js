import { mongooseConnect } from "@/lib/mongoose";
import { EndUser } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async function handle(req,res){
   await mongooseConnect();
    // handle user registration
    const {name,email,address,password} = req.body;
    // handle email
    const user = await EndUser.findOne({email});
    if(user){
      res.status(400).json({
        message:"User already exists"
      });
    }
    // handle password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    // handle email
    const newUser = new EndUser({
      name,
      email,
      address,
      password:hashedPassword,
    });
    // handle token 
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    newUser.token = token;
    // save user to database
    await newUser.save();
    res.status(201).json({
      message:"User registered successfully",
      newUser,
    });
   }