import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        profilePic : {
            type : String,
            default : "",
        },
        otp : {
            type : Number,
            default : undefined,
        },
        otpExpiresAt : {
            type : Date,
            default : undefined,
        }
    },
    { 
        timestamps : true,
        versionKey : false
    }
)

const User = mongoose.model("User", userSchema);

export default User;