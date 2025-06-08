import jwt from "jsonwebtoken";


export const generateToken = (userid, email, res) => {
    const payload = {
        userid,
        email
    }
    const key = process.env.JWT_SECRET
    const token = jwt.sign( payload, key, { expiresIn: "30d"});
    res.cookie("jwt", token, {
        maxAge : 30 * 24 * 60 * 60 * 1000,                 // 30 days in ms
        httpOnly : true,                                   // XSS attacks
        sameSite : "strict",                               // CSRF attacks
        secure : process.env.NODE_ENV === "production"     //only over HTTPS
    })
    return token
}
