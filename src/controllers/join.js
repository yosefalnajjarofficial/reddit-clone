const {
  getCommunityByName,
  addMember,
  getMembers,
  deleteMember,
} = require('../database/queries/communities');

exports.joinCommunity = (req, res, next) => {
  const { name } = req.body;
  let communityId;
  const userId = req.userId.id;
  //   console.log(userId);
  getCommunityByName(name)
    .then((result) => {
      if (!result.rows[0]) throw new Error("we don't have this community");
      else return result.rows[0].id;
    })
    .then((communityDbId) => {
      communityId = communityDbId;
      return communityId;
    })
    .then((id) => getMembers(id))
    .then((members) => {
      members.rows.forEach((obj) => {
        // If he is then delete him from the community
        if (obj.user_id === userId) {
          deleteMember(userId, communityId);
          // If not then add him as a member
        } else {
          addMember(userId, communityId);
        }
      });
    })
    .catch((err) => {
      if (err.message.includes('community')) {
        res.send(err.message);
      } else {
        next(err);
      }
    });
  res.send('joined');
};
