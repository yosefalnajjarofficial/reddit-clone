const jwt = require('jsonwebtoken');

const { getUserPosts, addPost } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { getUserComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');
const { getCommunities, getCommunityByName } = require('../database/queries/communities');

exports.getProfile = (req, res) => {
  let posts;
  // If the user has a cookie
  if (req.cookies.access) {
    const { access } = req.cookies;
    const privateKey = process.env.PRIVATE_KEY;
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) throw Error('not a good cookie');

      const { id, username, bio } = decoded;
      req.userId = id;
      // Show his profile
      getUserPosts(id)
        .then((result) => {
          posts = result.rows;
          return posts;
        })
        .then((posts) => posts.map((post) => getComments(post.id)))
        .then((array) => Promise.all(array))
        .then((result) => formatPosts(posts, result))
        .then((rs) => {
          getUserComments('fares98').then((result) => {
            getCommunities().then((communities) => {
              res.render('profile', {
                posts: rs,
                username,
                bio,
                comments: result.rows,
                communities: communities.rows,
              });
            });
          });
        })
        .catch((err) => console.error(err));
    });
    //   res.render('profile', { username });
  } else res.redirect('/');

  // If he does not direct him to the home page
};

exports.postProfile = (req, res) => {
  const { community, postTitle, postContent } = req.body;

  if (req.cookies.access) {
    const { access } = req.cookies;
    const privateKey = process.env.PRIVATE_KEY;
    jwt.verify(access, privateKey, (err, decoded) => {
      if (err) throw Error('not a good cookie');
      // Get the user id
      const { id } = decoded;
      // Get the community id
      getCommunityByName(community)
        .then((result) => {
          const communityId = result.rows[0].id;
          const postData = {
            postTitle,
            postContent,
            id,
            communityId,
          };
          addPost(postData);
          res.redirect('/profile');
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } else throw Error('access denied');
};
