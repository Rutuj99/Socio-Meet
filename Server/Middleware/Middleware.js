import Decode from "../JWT/Decode.js";

export default function Middleware(req,res,next){
     
    let authHeader=req.headers["authorization"]

    if(authHeader){
          
            let [type,token]=authHeader.split(" ");
           
            try{
                if(type=="Bearer" && token){
                    var data=Decode(token);
                    delete data.password;
                    req.loggedInUser=data;
                    next();
                    return;
             }
            }catch(err){
               throw new Error("Invalid Token");
            }
            


    }

     res.status(500).send("Not a logged In user");
    
}