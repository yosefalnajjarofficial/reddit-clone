const jwt = require('jsonwebtoken');

const { getPosts } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');

exports.getHome = (req, res) => {
  let posts;
  getPosts()
    .then((result) => {
      posts = result.rows;
      return posts;
    })
    .then((allPosts) => allPosts.map((post) => getComments(post.id)))
    .then((array) => Promise.all(array))
    .then((arr) => formatPosts(posts, arr))
    .then((results) => {
      // If the user has access show home with profile
      if (req.cookies.access) {
        const { access } = req.cookies;
        const privateKey = process.env.PRIVATE_KEY;
        // First check if it's the right token
        jwt.verify(access, privateKey, (err, decoded) => {
          if (err) res.render('home', { posts: results, logged: false });
          else res.render('home', { posts: results, logged: true });
        });
      }
      res.render('home', { posts: results, logged: false });

      // // If the user does not have access show home
      // res.render('home', { posts: results, logged: false });
    })
    .catch((err) => console.log(err));
};
