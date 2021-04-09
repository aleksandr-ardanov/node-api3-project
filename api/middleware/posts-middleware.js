const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');



const validatePostId = async (req, res, next) => {
  const {id} = req.params;
  const post = await Posts.getById(id);
  post 
    ? (req.post = post, next()) 
    : res.status(404).json({ message: "post not found" })
}


const  validatePost = async (req, res, next) => {
  const checkPostCreate = req.body;
  if (checkPostCreate.text && checkPostCreate.user_id){
    const checkUserId = await Users.getById(checkPostCreate.user_id); //check if user exists
    checkUserId 
      ? next()
      : res.status(404).json({message:"user does not exist, so he can't post anything!"})
  }
  else{
    res.status(400).json({ message: "missing required text field or user_id field" })
  }
}

module.exports = {
  validatePostId,
  validatePost
}

