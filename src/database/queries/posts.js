const { connection } = require('../config/connection');

const posts = () => connection.query(' SELECT posts.title, posts.content, posts.up_votes, posts.down_votes , communities.name, users.username FROM posts INNER JOIN users ON users.id = posts.user_id INNER JOIN communities ON communities.id = posts.community_id');

module.exports = {
  posts,
};
