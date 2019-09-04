const { connection } = require('../config/connection');

const getComments = (postId) => connection.query(
  `SELECT comments.comment_content, users.username FROM comments INNER JOIN users ON users.id = comments.user_id  WHERE post_id = ${postId}`,
);

const getUserComments = (username) => connection.query(
  'SELECT comments.comment_content, users.username FROM comments INNER JOIN users ON users.id = comments.user_id  WHERE users.username = $1',
  [username],
);

module.exports = {
  getComments,
  getUserComments,
};
