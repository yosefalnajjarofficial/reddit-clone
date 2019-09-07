const { getCommunityByName } = require('../database/queries/communities');
const { getCommunityPost } = require('../database/queries/posts');

exports.getCommunity = (req, res) => {
  // Get the community name from the user
  const { name } = req.params;
  // Check the community name
  getCommunityByName(name).then((result) => {
    if (result.rows[0]) {
      // Get all the posts for that community
      return getCommunityPost(name);
    }
  });

  // Display it to the user
};
