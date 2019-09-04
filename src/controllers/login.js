const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUsers } = require('../database/queries/users');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  getUsers(username)
    .then((result) => {
      // Check if the username in our db
      if (!result) throw Error('This user does not exist');
      // Check if the password is correct
      const dbPassword = result.rows[0].password;
      return bcrypt.compare(password, dbPassword);
    })
    // If all true then login
    .then((result) => {
      if (!result) throw Error('Password is incorrect');
      const privateKey = process.env.PRIVATE_KEY;
      // Give the user an access token
      return jwt.sign({ role: 'user' }, privateKey);
    })
    .then((token) => {
      res.cookie('access', token);
      res.redirect('/');
    })
    // If something went wrong, inform the user
    .catch((err) => console.log(err));
};
