import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const validateUser = async (req,res,next) => {
    const token = req.cookies.jwt;
    try {
        if(!token) {
            return res.status(401).json({ message : "Unauthorized Access"})
        }

        const cookie = jwt.verify(token,process.env.JWT_SECRET)
        if (!cookie) {
            return res.status(401).json({ message : "Unauthorized Access"})
        }

        const user = await User.findById(cookie.userid).select("-password -__v");
        if (!user) {
            return res.status(404).json({ message : "User not found"})
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("Error in validateUser middleware", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}