const jwt = require('jsonwebtoken');

const { getPosts } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');

exports.getHome = (req, res, next) => {
  // Store all of our posts
  let posts;
  getPosts()
    .then((result) => {
      posts = result.rows;
      return posts;
    })
    .then((allPosts) => allPosts.map((post) => getComments(post.id)))
    .then((comments) => Promise.all(comments))
    .then((comments) => formatPosts(posts, comments))
    .then((results) => {
      // If the user has access show home with profile
      if (req.cookies.access) {
        const { access } = req.cookies;
        const privateKey = process.env.PRIVATE_KEY;
        // First check if it's the right token
        jwt.verify(access, privateKey, (err, decoded) => {
          if (err) throw new Error('Bad access token');
          else res.render('home', { posts: results, logged: true, username: decoded.username });
        });
        // If the user does not have access show home
      } else res.render('home', { posts: results, logged: false });
    })
    .catch((err) => {
      if (err.message.includes('access token')) {
        res.send(err.message);
      } else next(err);
    });
};
