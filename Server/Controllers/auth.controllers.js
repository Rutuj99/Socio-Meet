import User from "../Modules/User.Model.js";
import bcrypt from "bcrypt";
import Encode from "../JWT/Encode.js";
import Decode from "../JWT/Decode.js"


export async function RegisterControll(data) {
  let emailFind = await User.findOne({ email: data.email });

  if (emailFind) {
    throw new Error("User with Email Address is alredy registered");
  }

  bcrypt.hash(data.password, 5, async function (err, hash) {
    if (err) {
      throw new Error("Something went wrong please try again");
    }

    let value = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      location: data.location,
      password: hash,
    });

    return value;
  });

  return "Registration Successfull";

}


export async function LoginControll(data) {
    try {
      const value = await User.findOne({
        email: data.email,
      });
  
      if (!value) {
        throw new Error("Email not found.");
      }
  
      const result = await bcrypt.compare(data.password, value.password);
     
      if (result) {
        const token = Encode(JSON.stringify(value));
        return {message:"Login Successfull",token:token};
      } else {
        throw new Error("Invalid password.");
      }
    } catch (error) {
      throw new Error("Invalid password.");
    }

  }
