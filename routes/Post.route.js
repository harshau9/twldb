const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/Post.model");


postRouter.post("/add",async (req,res)=>{
  const payload=req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send("created new post Classifed successfully ");
  } catch (err) {
    console.log(err)
    res.send({"msg":"Something went wrong"})
  }
});



module.exports = {
  postRouter
}
