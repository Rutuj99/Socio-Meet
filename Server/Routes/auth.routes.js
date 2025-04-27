import express from "express";
import { RegisterControll,LoginControll } from "../Controllers/auth.controllers.js";
import Middleware from "../Middleware/Middleware.js";
let authRoutes=express.Router();

authRoutes.post("/register",async (req,res)=>{
         
         try{
            let data=req.body;
            let value= await RegisterControll(data)
            res.status(201).send(value);
         }catch (err) {
            res.status(500).send(err.message);
          }
        
})



authRoutes.post("/login",async (req,res)=>{

       try{
            let data=req.body;
            let value=await LoginControll(data);
            res.status(200).send(value);
       }catch(err){
            res.status(500).send(err.message)
       }
})



authRoutes.get("/allreadyLogin",Middleware,(req,res)=>{
      
      try{
           res.status(200).send(req.loggedInUser);           
      }catch(err){
            res.status(500).send(err.message);
      }


})


export default authRoutes;