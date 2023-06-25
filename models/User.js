import { model,Schema,models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      address: {
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      password :{
        type : String,
        required : true,
        select : false,
      },
      token :{
        type : String,
        required : true,
      }
});

export const EndUser = models.EndUser || model('EndUser',UserSchema);