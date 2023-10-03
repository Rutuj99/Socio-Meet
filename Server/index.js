import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connect from "./Mongoose/Connect.js";
import authRoutes from "./Routes/auth.routes.js";
import postRoutes from "./Routes/post.routes.js";
let app=express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());


//  Routes
app.use("/auth",authRoutes);
app.use("/post",postRoutes);
app.get("/",(req,res)=>{
        res.send("Working..")
})


Connect().then(()=>{
    app.listen(3002,()=>{
           console.log("Server is running on http://localhost:3002")
    })
})

