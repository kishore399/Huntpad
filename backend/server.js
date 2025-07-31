import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

import authRouter from "./routes/authRoute.js";
import notesRouter from "./routes/note.router.js";

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({
    limit : "6mb"
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get(/(.*)/, (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    })
}

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on PORT ${port}`);
        });
    }catch(err){
        console.log("Error in connecting to MongoDB", err);
    }
};
startServer();