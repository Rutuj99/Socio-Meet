import express from "express";
let postRoutes=express.Router();
import Middleware from "../Middleware/Middleware.js";
import { addPost } from "../Controllers/post.controllers.js";
import { userPost } from "../Controllers/post.controllers.js";
import { allPost } from "../Controllers/post.controllers.js";

// posting 
postRoutes.post("/",Middleware,async (req,res)=>{

    try{
        let data=req.body;
        let value=await addPost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
          
          
});

//reading self post on the basis of user ID
postRoutes.get("/getUserPosts",Middleware,async(req,res)=>{
    try{
        let data=req.body;
        let value=await  userPost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
       
})


//getting all posts of all users
postRoutes.get("/getAllPosts",Middleware,async(req,res)=>{
    try{
        let value=await allPost();
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
           
})



export default postRoutes;
