
const jwt=require("jsonwebtoken")
const express=require("express");
const {PostModel}=require("../models/post.model")

const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    try {
        const token=req.headers.authorization;
        const vtoken=jwt.verify(token,"eval4")
        console.log(vtoken);
        const posts = await PostModel.find({userId:vtoken.userId})//{$and:[{userId},{device:{$in:device}}]}
        res.send(posts)
    } catch (err) {
        res.send(err.message);
    }
})

postRouter.post("/add",async(req,res)=>{
    try {
        const newPost= new PostModel(req.body);
        await newPost.save();
        res.status(200).send({"msg":"Post created"})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// patch
postRouter.patch("/update/:id",async(req,res)=>{
    const postId=req.params.id;
    try {
        await PostModel.findByIdAndUpdate({_id:postId});
        res.status(200).send({"msg":"Post updated"})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const postId=req.params.id;
    try {
        await PostModel.findByIdAndDelete({_id:postId});
        res.status(200).send({"msg":"Post deleted"}) 
        
    } catch (err) {
        res.status(400).send(err.message)
    }
})
module.exports={postRouter}
