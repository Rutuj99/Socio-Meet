import mongoose from "mongoose";

let PostSchema=new mongoose.Schema({
       userId:{
         type:String,
         required:true
       },
       firstName:{
        type:String,
        required:true
      },
      lastName:{
        type:String,
        required:true
      },
      caption:{
        type:String,
        required:true
      },
      post:{
         type:String,
         required:true
      }
},{
  timestamps: true 
});


let Post=mongoose.model("post",PostSchema);
export default Post;