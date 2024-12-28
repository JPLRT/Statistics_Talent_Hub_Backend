const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @route   POST /api/posts
// @desc    Create a new post
router.post('/', async (req, res) => {
  const { user, text, imageUrl } = req.body;

    try {
         const newPost = new Post({ user, text, imageUrl });
          const post = await newPost.save();
           res.json(post);
       } catch (err) {
           console.error(err.message);
           res.status(500).send('Server error');
        }
    });

   // @route   GET /api/posts
   // @desc    Get all posts
   router.get('/', async (req, res) => {
       try {
            const posts = await Post.find().populate('user', ['name','profile']);
             res.json(posts);
       } catch (err) {
           console.error(err.message);
           res.status(500).send('Server error');
        }
    });

    // @route   DELETE /api/posts/:id
    // @desc    Delete a post by id
    router.delete('/:id', async (req, res) => {
        try {
             await Post.findByIdAndDelete(req.params.id);
             res.json({ msg: 'Post deleted' });
        } catch (err) {
            console.error(err.message);
             res.status(500).send('Server error');
       }
    });


    module.exports = router;