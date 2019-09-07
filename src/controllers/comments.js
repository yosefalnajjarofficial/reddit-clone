const jwt = require('jsonwebtoken');

const { addComment } = require('../database/queries/comments');

exports.postComment = (req, res) => {
  const { postId, commentContent } = req.body;
  const { id } = req.userId;
  // Call the query of adding a comment
  addComment({ id, postId, commentContent });
  res.redirect('/');
};
