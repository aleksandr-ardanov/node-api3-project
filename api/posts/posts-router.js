const express = require('express');
const { validatePostId, validatePost } = require('../middleware/posts-middleware');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Posts.get()
      .then(posts => {
          res.status(200).json(posts);
      })
      .catch(err => {
        next(err);
      })
  });


router.get('/:id', validatePostId, (req, res) => {
        res.status(200).json(req.post);
})

router.post('/', validatePost, (req, res, next) => {
  const newPost = req.body;
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      next(err);
    })
});

router.put('/:id', validatePostId, validatePost, (req, res, next) => {
  const id = req.params.id;
  const updatedPost = req.body;
  Posts.update(id, updatedPost)
    .then(() => {
      return (Posts.getById(id));
    })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      next(err);
    })
})

router.delete('/:id', validatePostId, async (req, res, next) => {
  const id = req.params.id;
  const oldPost = await (Posts.getById(id));
  Posts.remove(id)
    .then(() => {
      res.status(200).json({message:'this post successfully deleted', "post": oldPost});
    })
    .catch(err => {
      next(err);
    })
})

// eslint-disable-next-line no-unused-vars
router.use((err,req,res,next) => {
    res.status(500).json({
      message:"There's a problem!",
      error:err.message
    })
  })  

  

module.exports = router;