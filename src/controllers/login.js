const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUsers } = require('../database/queries/users');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  // Store the user id and username in a variable
  let user;
  const { username, password } = req.body;
  getUsers(username)
    .then((result) => {
      // Check if the username in our db
      if (!result.rows[0]) throw Error('This user does not exist');

      // Get the user id
      const { id, password } = result.rows[0];

      user = { id, password };
      return user;
    })
    .then((userInfo) => {
      const dbPassword = userInfo.password;

      // Check if the password is correct
      return bcrypt.compare(password, dbPassword);
    })
    .then((result) => {
      if (!result) throw Error('Password is incorrect');

      const privateKey = process.env.PRIVATE_KEY;

      const { id } = user;
      // Give the user an access token
      return jwt.sign({ id, username }, privateKey);
    })
    .then((token) => {
      // If all true then login
      res.cookie('access', token);
      res.redirect('/');
    })
    .catch((err) => {
      // If something went wrong, inform the user
      if (err.message.includes('exist')) {
        res.send(err.message);
      } else if (err.message.includes('incorrect')) {
        res.send(err.message);
      } else next(err);
    });
};
