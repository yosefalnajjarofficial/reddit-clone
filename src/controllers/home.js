const { posts } = require('../database/queries/posts');

exports.getHome = (req, res) => {
  posts()
    .then((result) => res.render('home', { posts: result.rows }))
    .catch((err) => console.log(err));
};
