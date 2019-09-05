const jwt = require('jsonwebtoken');

const { addComment } = require('../database/queries/comments');

exports.postComment = (req, res) => {
  const { postId, commentContent } = req.body;
  // Check if the user is able to comment
  if (req.cookies.access) {
    const { access } = req.cookies;
    const privateKey = process.env.PRIVATE_KEY;
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) throw Error('not a good cookie');
      // Get the user id
      const { id } = decoded;
      console.log(decoded);
      const commentData = {
        id,
        postId,
        commentContent,
      };
      // Call the query of adding a comment
      addComment(commentData);
      res.redirect('/');
    });
  } else console.error('Not allowed to post a comment');
};
