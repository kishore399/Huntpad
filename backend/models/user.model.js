import mongoose from "mongoose";

const eg = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const User = mongoose.model("User", eg);

export default User;