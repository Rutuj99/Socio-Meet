import jwt from "jsonwebtoken";

export default function Encode(data){
       let token=jwt.sign(data,process.env.SECRETE_KEY,{ expiresIn:72000 });
       return token;
}