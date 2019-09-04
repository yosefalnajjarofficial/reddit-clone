const { connection } = require('../config/connection');

const getReplies = (commentId) => connection.query(
  `SELECT replies.reply_content, users.username FROM replies INNER JOIN users ON users.id = replies.user_id WHERE comment_id = ${commentId} `,
);

module.exports = {
  getReplies,
};
