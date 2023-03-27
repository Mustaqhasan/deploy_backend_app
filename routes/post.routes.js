const express=require("express")
const { getAllPosts, addPost, updatePost, deletePost } = require("../controllers/post.controllers")
const { auth } = require("../middlewares/auth.middleware");
const { PostModal } = require("../model/post.model");
const postRouter=express.Router()
const jwt=require('jsonwebtoken')

postRouter.get("/", getAllPosts);
postRouter.post("/add",addPost);
postRouter.patch("/update/:postID", updatePost);
postRouter.delete("/delete/:postID", deletePost);


module.exports={
    postRouter
}