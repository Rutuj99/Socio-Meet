import express from "express";
import cors from "cors";
import bodyParser from "body-parser";



let app=express();



app.get("/",(req,res)=>{
        res.send("Working...")
})




app.listen(3002,()=>{
       console.log("Server is running on http://localhost:3002")
})
