const { connection } = require('../config/connection');

const getPosts = () => connection.query(
  ' SELECT posts.id, posts.post_title, posts.post_content, posts.up_votes, posts.down_votes , communities.community_name, users.username FROM posts INNER JOIN users ON users.id = posts.user_id INNER JOIN communities ON communities.id = posts.community_id',
);

const getUserPosts = (userId) => connection.query(
  'SELECT posts.id, posts.post_title, posts.post_content, posts.up_votes, posts.down_votes , communities.community_name, users.username FROM posts INNER JOIN users ON users.id = posts.user_id INNER JOIN communities ON communities.id = posts.community_id WHERE users.id = $1',
  [userId],
);

module.exports = {
  getPosts,
  getUserPosts,
};
