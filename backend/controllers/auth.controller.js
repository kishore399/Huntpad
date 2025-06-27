import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";
import { sendEmail } from "../lib/resend.js";
import { signupOtpMail } from "../mailTemplate/signupOtp.js";
import { resetPasswordMail } from "../mailTemplate/resetPasswordOtp.js";
import { welcomeMail } from "../mailTemplate/WelcomeMail.js";
import { welcomeBackMail } from "../mailTemplate/WelcomeBackMail.js";

export const signup = async (req,res) => {
    const { fullName:name, email, password} = req.body;
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

        const otp = crypto.randomInt(100000, 999999);  
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const firstName = name.split(" ")[0];
        const htmlContent = signupOtpMail(firstName, otp);
        const resendResponse = sendEmail(email, "Welcome! Here's your OTP to get started", htmlContent);
        console.log(resendResponse)

        console.log(`OTP for ${email} is ${otp}`); 

        const newUser = new User ({
            name : name,
            email : email,
            password : hashedPassword,
            otp : otp,
            otpExpiresAt : Date.now() + 30 * 60 *1000      // 30 mins
        })

        if (newUser) {
            await newUser.save();
        }else {
            return res.status(400).json({ message : "Invalid User Credentials" });
        }
        generateToken(newUser._id, newUser.email, res);
        const userInfo = {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.name,
            profilePic: newUser.profilePic,
            isVerified: newUser.isVerified,
            createdAt: newUser.createdAt,
        }
        return res.status(201).json({ userInfo, message : "OTP sent seccessfully" })

    } catch (err) {
        console.log("error in signup controller",err);
        return res.status(500).json({ message: "Internal Server Error" });
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

        if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }

        const firstName = user.name.split(" ")[0];
        const htmlContent = welcomeBackMail(firstName)
        const resendResponse = sendEmail(email, "Glad to see you again", htmlContent);
        console.log(resendResponse)

        const userInfo = {
            _id: user._id,
            email: user.email,
            fullName: user.name,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
        return res.status(200).json({userInfo})
    }
    catch(err){
        console.log("Error in login controller", err);
        return res.status(500).json({message: "Internal Server Error"})
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
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req,res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message : "No profile picture provided" });
        }

        // Upload Profile pic
        const cloud = await cloudinary.uploader.upload(profilePic);
        if (!cloud) {
            return res.status(500).json({ message : "Failed to upload profile picture" });
        }

        const user = await User.findById(req.user._id);
        //const user = await User.findById("68459d6c38f16d4173106e6c");
        if (!user) {
            return res.status(404).json({ message : "User not found"})
        }

        if (user.profilePic === profilePic) {
            return res.status(200).json(user);
        }
        // Delete the old one
        if (user.profilePic) {
            const isdeleted = await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            console.log("Old profile pic deleted:", isdeleted);
        }
        user.profilePic = cloud.secure_url;
        await user.save();

        const userInfo = {
            _id: user._id,
            email: user.email,
            fullName: user.name,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
        return res.status(200).json({userInfo});
    } catch (err) {
        console.log("Error in updateProfile controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req,res) => {
    try {
        const userInfo = {
            _id: req.user._id,
            email: req.user.email,
            fullName: req.user.name,
            profilePic: req.user.profilePic,
            isVerified: req.user.isVerified,
            createdAt: req.user.createdAt,
        }
        return res.status(200).json({userInfo});
    } catch (err) {
        console.log("Error in checkAuth controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const verifyEmail = async (req,res) => {
    const { email, code, from } = req.body;
    const otp = Number(code);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp !== otp ) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        user.isVerified = true;
        user.otp = undefined;
        console.log(from,user.otp)
        user.otpExpiresAt = undefined;
        await user.save();
        if (from === "signup") {
            generateToken(user._id, user.email, res);

            const firstName = user.name.split(" ")[0];
            const htmlContent = welcomeMail(firstName)
            const resendResponse = sendEmail(email, "You're all set - Let's get started", htmlContent);
            console.log(resendResponse)
        }


        const userInfo = {
            _id: user._id,
            email: user.email,
            fullName: user.name,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
        return res.status(200).json({userInfo});

    } catch (err) {
        console.log("Error in verifyEmail controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const forgotPassword = async (req,res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = crypto.randomInt(100000, 999999);
        user.otp = otp;
        user.otpExpiresAt = Date.now() + 30 * 60 * 1000; // 30 mins
        user.isVerified = false;
        await user.save();
      
        const firstName = user.name.split(" ")[0];
        const htmlContent = resetPasswordMail(firstName,otp)
        const resendResponse = sendEmail(email, "Here's your password reset otp", htmlContent);
        console.log(resendResponse)

        // send OTP to user's email (this part is not implemented in this code snippet)
        console.log(`OTP for ${email} is ${otp}`);

        return res.status(200).json({ userInfo : { email : email } });

    } catch (err) {
        console.log("Error in forgotPassword controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const resetPassword = async (req,res) => {
    const { email, password } = req.body;
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.otp)
        if (!user.isVerified) {
            return res.status(401).json({ message: "unAuthorized access" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        await user.save();
        generateToken(user._id, user.email, res);

        const userInfo = {
            _id: user._id,
            email: user.email,
            fullName: user.name,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
        return res.status(200).json({userInfo});

    } catch (err) {
        console.log("Error in resetPassword controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}