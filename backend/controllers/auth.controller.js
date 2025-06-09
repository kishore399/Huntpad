import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req,res) => {
    const { name, email, password} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({message : "All fields are required"});
    }

    if( password.length < 6) {
        return res.status(400).json({ message : "Password must be at least 6 characters long" });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)){
        return res.status(400).json({ message : "Invalid Email Format" })
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({message : "User already exits with this Email"});
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User ({
            name : name,
            email : email,
            password : hashedPassword
        })

        if (newUser) {
            generateToken( newUser._id, newUser.email, res);
            await newUser.save();
            return res.status(201).json({
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                profilePic : newUser.profilePic
            })

        }else {
            return res.status(400).json({ message : "Invalid User Credentials" });
        }
    } catch (err) {
        console.log("error in signup controller",err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req,res) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message : "All fields are required"})
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)){
        return res.status(400).json({ message : "Invalid Email Format" })
    }

    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message : "User not found"})
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({ message : "Invalid Credentials"})
        }

        generateToken(user._id, user.email, res);
        return res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profilePic : user.profilePic
        })
    }
    catch(err){
        console.log("Error in login controller", err);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req,res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV === "production"
        });
        return res.status(200).json({ message : "Logged out successfully"});
        
    } catch (err) {
        console.log("Error in logout controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req,res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message : "No profile picture provided" });
        }

        const cloud = await cloudinary.uploader.upload(profilePic);
        if (!cloud) {
            return res.status(500).json({ message : "Failed to upload profile picture" });
        }

        const user = await User.findById(req.user._id);
        user.profilePic = cloud.secure_url;
        await user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.log("Error in updateProfile controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}