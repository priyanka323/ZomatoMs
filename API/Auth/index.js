import express from "express";
import bcrypt from "bcryptjs";

//models
import {UserModel} from "../../database/users";

const Router = express.Router();

/*
Route        /signup
Des        signup using email and password
params     none
Acess      Public
Method     Post
*/

Router.post("/signup", async(req,res)=> {
  try {
    const {email, password, fullname, phoneNumber} = req.body.credentials;

    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone) {
      return res.json({error: "User already Exists!!"});
    }
//hashing ur password
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

//save to db
await UserModel.create({
  ...req.body.credentials,
  password: hashedPassword
});

    //jwt token
const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

return res.status(200).json({token, status: "success"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

//xyz555  >code   -> code   ->  code  like password converted into differentn codes a number of time
