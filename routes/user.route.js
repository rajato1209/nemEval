const express=require("express");
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
const { UserModel } = require("../models/user.model");

const userRoute=express.Router();

// user registeration
userRoute.post("/register",async(req,res)=>{
    const payload=req.body;
    console.log(payload.email)
    try {
        let userExist=await UserModel.findOne({email:payload.email})
        if(userExist){
            res.status(200).send("User already exist, please login")
        }else{
           const hashp= await bcrypt.hashSync(payload.password,4)
           payload.password=hashp;
           const newUser=new UserModel(payload);
           await newUser.save();
           res.status(200).send({"msg":"User Registered"})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// login user

userRoute.post("/login",async(req,res)=>{
    const{email,password}=req.body;
   try {
    const userExist= await UserModel.findOne({email})
    if(userExist){
        const vpass=await bcrypt.compare(password,userExist.password);
        if(vpass){
            res.status(200).send({"msg":"Login successfull","token":jwt.sign({email:userExist.email,userID:userExist._id},"eval4")})
        }else{
            res.status(400).send({"msg":"wrong password"})
        }
    }else{
        res.send({"msg":"Please signup first"});
    }
   } catch (err) {
    res.status(400).send({"msg":err.message})
   }
})

module.exports={userRoute}