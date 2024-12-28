const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
// @route   POST /api/comments
// @desc    Create a new comment
router.post('/', async (req, res) => {
    const { post, user, text, parentCommentId } = req.body;
    try {
        const newComment = new Comment({ post, user, text, parentCommentId });
        const comment = await newComment.save();
         if(parentCommentId){
           await Comment.findByIdAndUpdate(parentCommentId, {$push: { replies: comment._id } });
          }
        res.json(comment);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
    }
});

// @route   GET /api/comments?postId=:postId
// @desc    Get all comments for a post
router.get('/', async (req, res) => {
 const { postId } = req.query;
    try {
       const comments = await Comment.find({ post: postId, parentCommentId : null}).populate('user', ['name']).populate({ path: 'replies', populate: { path : 'user', select : 'name'}  });
        res.json(comments);
   } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
       await Comment.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Comment deleted' });
   } catch (err) {
      console.error(err.message);
        res.status(500).send('Server error');
   }
});

module.exports = router;