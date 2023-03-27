const jwt = require("jsonwebtoken");
const { PostModal } = require("../model/post.model");
const getAllPosts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      const posts = await PostModal.find({ userID: decoded.userID });
      res.status(200).send(posts);
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const addPost = async (req, res) => {
  try {
    const post=new PostModal(req.body)
    await post.save()
    res.status(200).send({msg:"A new Post has been added"})
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const updatePost=async(req,res)=>{
    const payload=req.body;
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,'masai')
    const postID=req.params.postID;
    const req_id=decoded.userID
    const post=await PostModal.findOne({_id:postID})
    const userId_in_post=post.userID

    try {
        if(req_id===userId_in_post){
            await PostModal.findByIdAndUpdate({_id:postID},payload)
            res.status(200).send({msg:"Post has been updated"})
        }else{
            res.status(400).send({msg:"Not Logged in"})
        }
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
}
const deletePost=async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,'masai')
    const postID=req.params.postID;
    const req_id=decoded.userID
    const post=await PostModal.findOne({_id:postID})
    const userId_in_post=post.userID

    try {
        if(req_id===userId_in_post){
            await PostModal.findByIdAndDelete({_id:postID})
            res.status(200).send({msg:"Post has been deleted"})
        }else{
            res.status(400).send({msg:"Not Logged in"})
        }
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
}



module.exports = {
  getAllPosts,
  addPost,
  updatePost,
  deletePost
};
