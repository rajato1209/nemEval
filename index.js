require("dotenv").config();
const express=require("express");
const {connection}=require("./config/main");
const { postRouter } = require("./routes/post.route");
const { userRoute } = require("./routes/user.route");
const {auth}=require("./middleware/auth.middleware")

const app=express();
app.use(express.json());




app.use("/users",userRoute)
app.use("/posts",auth)
app.use("/posts",postRouter)

app.listen(process.env.Port,async()=>{
    try {
        await connection;
        console.log(`server is connected to database`)
    } catch (err) {
        console.log("connection failed")
    }
})