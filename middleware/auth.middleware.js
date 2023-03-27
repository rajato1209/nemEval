const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
    if(token){
        const decoded=jwt.verify(token,"eval4")
        if(decoded){
            req.body.userId=decoded.userID
            next();
        }else{
            res.status(400).send({"msg":"Please Login First"})
        }
    }else{
        res.status(400).send({"msg":"Please Login First"})
    }
}

module.exports={
    auth
}