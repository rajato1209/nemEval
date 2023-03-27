const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
   title:{type:String,required:true},
   body:{type:String,required:true},
   device:{type:String,required:true,enum:["Laptop","Tablet","Mobile"]},
   no_of_comments:{type:Number,required:true},
   userId:String
},{versionKey:false})

const PostModel=mongoose.model("post",postSchema)


module.exports={PostModel}
/*title ==> String
body ==> String
device ==> String
no_of_comments ==> Number
 */

// const mongoose=require("mongoose");

// const postSchema=mongoose.Schema({
//     title:String,
//     body:String,
//     device:String,
//     no_of_comments:Number
//     // userID:{type:String}
// })

// const PostModel=mongoose.model("post",postSchema);

// module.exports={PostModel}


