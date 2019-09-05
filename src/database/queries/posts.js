const { connection } = require('../config/connection');

const getPosts = () => connection.query(
  ' SELECT posts.id, posts.post_title, posts.post_content, posts.up_votes, posts.down_votes , communities.community_name, users.username FROM posts INNER JOIN users ON users.id = posts.user_id INNER JOIN communities ON communities.id = posts.community_id',
);

const getUserPosts = (userId) => connection.query(
  'SELECT posts.id, posts.post_title, posts.post_content, posts.up_votes, posts.down_votes , communities.community_name, users.username FROM posts INNER JOIN users ON users.id = posts.user_id INNER JOIN communities ON communities.id = posts.community_id WHERE users.id = $1',
  [userId],
);

const addPost = (postData) => {
  const {
    postTitle, postContent, id, communityId,
  } = postData;
  const sql = {
    text:
      'INSERT INTO posts (post_title, post_content, up_votes, down_votes, user_id, community_id) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [postTitle, postContent, 10, 5, id, communityId],
  };
  return connection.query(sql);
};

module.exports = {
  getPosts,
  getUserPosts,
  addPost,
};
