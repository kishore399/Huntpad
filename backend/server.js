import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import authRouter from "./routes/authroute.js";
import notesRouter from "./routes/note.router.js";

const app = express();
const port = process.env.PORT;

app.use(express.json({
    limit : "10mb"
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

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