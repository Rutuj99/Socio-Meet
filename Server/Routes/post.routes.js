import express from "express";
let postRoutes=express.Router();
import Middleware from "../Middleware/Middleware.js";
import { addPost } from "../Controllers/post.controllers.js";
import { userPost } from "../Controllers/post.controllers.js";
import { allPost } from "../Controllers/post.controllers.js";
import { deletePost } from "../Controllers/post.controllers.js";
import { updatePost,AddComment } from "../Controllers/post.controllers.js";


// posting 
postRoutes.post("/",async (req,res)=>{

    try{
        let data=req.body;
        let value=await addPost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
          
          
});


//updating post 
postRoutes.patch("/patch",async (req,res)=>{
       
    try{
        let data=req.body;
        let value=await updatePost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }

})


//reading self post on the basis of user ID
postRoutes.get("/getUserPosts/:ID",async(req,res)=>{
    try{
        let data=req.params.ID
        let value=await  userPost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
       
})



//reading self post on the basis of user ID
postRoutes.get("/deletePost/:ID",async(req,res)=>{
    try{
        let data=req.params.ID
        let value=await deletePost(data);
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
       
})


//getting all posts of all users
postRoutes.get("/getAllPosts",async(req,res)=>{
    try{
        let value=await allPost();
        res.status(200).send(value);
    }catch(err){
          res.status(500).send(err.message);
    }
           
})


// insert comment by updating/patch 

postRoutes.patch("/comment",async(req,res)=>{
         try{
            let data=req.body;
            // console.log(data,"data");
            let value=await AddComment(data);
            // console.log(value);
            res.status(200).send(value);
             
         }catch(err){
              res.status(500).send(err.message);
         }
})



export default postRoutes;
