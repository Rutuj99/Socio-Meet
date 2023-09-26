import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connect from "./Mongoose/Connect.js";
let app=express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());







app.get("/",(req,res)=>{
        res.send("Working..")
})




Connect().then(()=>{
    app.listen(3002,()=>{
           console.log("Server is running on http://localhost:3002")
    })
})

