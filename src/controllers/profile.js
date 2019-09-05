const jwt = require('jsonwebtoken');

const { getUserPosts } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { getUserComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');

exports.getProfile = (req, res) => {
  let posts;
  // If the user has a cookie
  if (req.cookies.access) {
    const { access } = req.cookies;
    const privateKey = process.env.PRIVATE_KEY;
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) throw Error('not a good cookie');

      const { id, username, bio } = decoded;
      // Show his profile
      getUserPosts(1)
        .then((result) => {
          posts = result.rows;
          return posts;
        })
        .then((posts) => posts.map((post) => getComments(post.id)))
        .then((array) => Promise.all(array))
        .then((result) => formatPosts(posts, result))
        .then((rs) => {
          getUserComments('fares98').then((result) => {
            res.render('profile', {
              posts: rs,
              username,
              bio,
              comments: result.rows,
            });
          });
        })
        .catch((err) => console.error(err));
    });
    //   res.render('profile', { username });
  } else res.redirect('/');

  // If he does not direct him to the home page
};
