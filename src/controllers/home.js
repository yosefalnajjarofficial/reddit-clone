const { getPosts } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');

const format = (posts, comments) => {
  posts.forEach((post, index) => {
    post.children = comments[index].rows;
  });
  return posts;
};
exports.getHome = (req, res) => {
  let posts;
  getPosts()
    .then((result) => {
      posts = result.rows;
      return posts;
    })
    .then((posts) => posts.map((post) => getComments(post.id)))
    .then((array) => Promise.all(array))
    .then((arr) => format(posts, arr))
    .then((results) => res.render('home', { posts: results }));
};
