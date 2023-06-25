import { mongooseConnect } from "@/lib/mongoose";
import { EndUser } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

export default async function handle(req,res){
    await mongooseConnect();
    // handle user login 
        const {email,password} = req.body;
        // handle email
        const user = await EndUser.findOne({email}).select('+password');
        if(!user){
             res.status(401).json({message:"Invalid email"});
        }
        // handle password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
             res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        user.token = token;
        user.password = undefined;
        res.status(200).json({user});
    }