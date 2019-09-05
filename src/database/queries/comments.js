const { connection } = require('../config/connection');

const getComments = (postId) => connection.query(
  `SELECT comments.comment_content, users.username FROM comments INNER JOIN users ON users.id = comments.user_id  WHERE post_id = ${postId}`,
);

const getUserComments = (username) => connection.query(
  'SELECT comments.comment_content, users.username FROM comments INNER JOIN users ON users.id = comments.user_id  WHERE users.username = $1',
  [username],
);

const addComment = (commentData) => {
  const { id, postId, commentContent } = commentData;
  const sql = {
    text:
      'INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ($1, $2, $3, $4, $5)',
    values: [commentContent, 4, 6, id, postId],
  };
  return connection.query(sql);
};

module.exports = {
  getComments,
  getUserComments,
  addComment,
};
