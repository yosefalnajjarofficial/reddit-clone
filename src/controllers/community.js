const jwt = require('jsonwebtoken');

const { getCommunityByName, addCommunity } = require('../database/queries/communities');
const { getCommunityPost } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');

exports.getCommunity = (req, res, next) => {
  let posts;
  // Get the community name from the user
  const { name } = req.params;
  // Check the community name
  getCommunityByName(name)
    .then((result) => {
      if (!result.rows[0]) {
        throw new Error('No such community found');
        // Get all the posts for that community
      } else return getCommunityPost(name);
    })
    .then((result) => {
      posts = result.rows;
      return posts;
    })
    .then((allPosts) => allPosts.map((post) => getComments(post.id)))
    .then((comments) => Promise.all(comments))
    .then((comments) => formatPosts(posts, comments))
    .then((formatted) => {
      // If the user has access show with profile
      if (req.cookies.access) {
        const { access } = req.cookies;
        const privateKey = process.env.PRIVATE_KEY;
        // First check if it's the right token
        jwt.verify(access, privateKey, (err, decoded) => {
          if (err) res.status(401).render('alert');
          else {
            res.render('community', {
              posts: formatted,
              logged: true,
              username: decoded.username,
              name,
            });
          }
        });
        // If the user does not have access show without user name
      } else res.render('community', { posts: formatted, logged: false, name });
    })
    // Display it to the user
    .catch((err) => {
      if (err.message.includes('community')) {
        res.send(err.message);
      } else {
        next(err);
      }
    });
};

exports.postCommunity = (req, res, next) => {
  const { communityName } = req.body;
  const { id } = req.userId;
  // Check the name first
  getCommunityByName(communityName)
    .then((result) => {
      if (result.rows[0]) throw new Error('This name is already taken');

      return addCommunity(communityName, id);
    })
    .then((result) => res.redirect(`/community/${communityName}`))
    .catch((err) => {
      if (err.message.includes('taken')) res.send(err.message);
      else next(err);
    });
};
