import { mongooseConnect } from "@/lib/mongoose";
import { EndUser } from "@/models/User";

export default async function handle(req,res){
    await mongooseConnect();
    // handle user login 
        const {email,name,address} = req.body;

        // handle email
        const user = await EndUser.findOne({email});
        const id = user._id;
        if(!user){
             res.status(401).json({message:"User not exist try login"});
        }

       await EndUser.updateOne({_id:id},{email,name,address});
       const updatedUser = await EndUser.findOne({ _id: id });

        res.status(200).json({message:"User updated successfully",updatedUser});
    }