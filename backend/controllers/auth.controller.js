import User from "../models/user.model.js";

export const signup = (req,res) => {
    res.send("from controller signup")
}

export const login = async (req,res) => {
    try{
        const r = await User.find({name: req.params.id});
        res.status(200).json(r);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req,res) => {
    res.send("from controller logout")
}