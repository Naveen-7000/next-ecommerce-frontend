import { mongooseConnect } from "@/lib/mongoose";
import { EndUser } from "@/models/User";

export async function handle(req,res){
    await mongooseConnect();
    if(req.method === "GET"){
        // return all the users from the database also handle perticular user data based on id
        const user = await EndUser.findById(req.params.id);
        res.status(200).json(user);
    }
}