import jwt from "jsonwebtoken";


export default function Decode(token){
     
          let data=jwt.verify(token,process.env.SECRETE_KEY);
          
          return data;

}