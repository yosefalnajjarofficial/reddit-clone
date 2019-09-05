const { connection } = require('../config/connection');

const getCommunities = () => connection.query('SELECT * FROM communities');

const getCommunityByName = (communityName) => connection.query('SELECT * FROM communities WHERE community_name = $1', [communityName]);

module.exports = {
  getCommunities,
  getCommunityByName,
};
