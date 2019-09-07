exports.getLogout = (req, res) => {
  res.clearCookie('access');
  res.redirect('/');
};
