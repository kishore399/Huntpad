import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/authRoute.js";;

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/api/auth", authRouter);

const startServer = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${connect.connection.host}`);
        app.listen(port, () => {
            console.log(`Server is running on PORT ${port}`);
        });
    }catch(err){
        console.log("Error in connecting to MongoDB", err);
    }
};
startServer();