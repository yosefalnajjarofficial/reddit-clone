const { connection } = require('../config/connection');

const getCommunities = () => connection.query('SELECT * FROM communities');

const getCommunityByName = (communityName) => connection.query('SELECT * FROM communities WHERE community_name = $1', [communityName]);

const addCommunity = (communityName, userId) => connection.query('INSERT INTO communities (community_name, user_id) VALUES ($1, $2)', [
  communityName,
  userId,
]);

const addMember = (userId, communityId) => connection.query('INSERT INTO members (user_id, community_id) VALUES ($1, $2)', [
  userId,
  communityId,
]);

const getMembers = (communityId) => connection.query(
  'SELECT users.username FROM members INNER JOIN users ON users.id = members.user_id WHERE community_id = $1',
  [communityId],
);

const deleteMember = (userId, communityId) => connection.query('DELETE FROM members WHERE user_id = $1 AND community_id = $2', [
  userId,
  communityId,
]);

module.exports = {
  getCommunities,
  getCommunityByName,
  addMember,
  getMembers,
  deleteMember,
  addCommunity,
};
