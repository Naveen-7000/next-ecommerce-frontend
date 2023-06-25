import { model,Schema,models } from "mongoose";

const WhishlistSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    products:{
        type:mongodb.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true,
    }
});

export const Whishlist = models.Whishlist || model('Whishlist',WhishlistSchema);