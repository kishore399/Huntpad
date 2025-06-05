import express from "express";

import authRouter from "./routes/authRoute.js"

const app = express();

app.get("/api/auth", authRouter);

app.listen(5000, () => {
    console.log("Server is running at port: 5000");

});

