const { getUserPosts, addPost } = require('../database/queries/posts');
const { getComments } = require('../database/queries/comments');
const { getUserComments } = require('../database/queries/comments');
const { formatPosts } = require('../helpers/format');
const { getCommunities, getCommunityByName } = require('../database/queries/communities');

exports.getProfile = (req, res, next) => {
  // Store all the user posts
  let posts;
  const { id, username } = req.userId;

  // Get the user posts by his id
  getUserPosts(id)
    .then((result) => {
      posts = result.rows;
      return posts;
    })
    // Get the posts comments by post id
    .then((allPosts) => allPosts.map((post) => getComments(post.id)))
    .then((array) => Promise.all(array))
    .then((result) => formatPosts(posts, result))
    .then((postsWithComments) => {
      // Get the user comments on all posts
      getUserComments(username)
        .then((comments) => {
          // Get the communities for the form
          getCommunities()
            .then((communities) => {
              res.render('profile', {
                posts: postsWithComments,
                username,
                comments: comments.rows,
                communities: communities.rows,
              });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.postProfile = (req, res, next) => {
  const { community, postTitle, postContent } = req.body;
  // Get the user id
  const { id } = req.userId;
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
      next(err);
    });
};
