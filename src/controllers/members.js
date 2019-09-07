const { getCommunityByName, getMembers } = require('../database/queries/communities');

exports.getMembers = (req, res, next) => {
  // Get the community name from the user
  const { name } = req.params;
  console.log(name);
  getCommunityByName(name)
    .then((result) => {
      if (!result.rows[0]) throw new Error('no such community is found');
      else return result.rows[0];
    })
    .then((community) => getMembers(community.id))
    .then((members) => {
      res.render('members', { name, members: members.rows });
    })
    .catch((err) => {
      if (err.message.includes('found')) {
        res.send(err.message);
      } else next(err);
    });
};
