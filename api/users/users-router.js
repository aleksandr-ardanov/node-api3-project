const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();


router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body;
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const updatedUser = req.body;
  Users.update(id, updatedUser)
    .then(() => {
     return Users.getById(id);
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params;
  Users.remove(id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      posts.length === 0
      ? res.status(200).json({message:'user has no posts yet'})
      : res.status(200).json(posts)
    })
    .catch(err => {
      next(err);
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const newPost = {...req.body, user_id: id};
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      next(err);
    })
});



// eslint-disable-next-line no-unused-vars
router.use((err,req,res,next) => {
  res.status(500).json({
    message:"There's a problem!",
    error:err.message
  })
})



// do not forget to export the router
module.exports = router;