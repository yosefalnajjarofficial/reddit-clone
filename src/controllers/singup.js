const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addUser } = require('../database/queries/users');

exports.getSignup = (req, res) => {
  res.render('singup');
};

exports.postSignup = (req, res) => {
  // Get tha password to hash it
  const { password } = req.body;
  // Hashing the password
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      req.body.password = hash;
      // Storing the hashed password and user info
      addUser(req.body)
        .then((result) => {
          // Give the user an access token
          const privateKey = process.env.PRIVATE_KEY;
          return jwt.sign({ role: 'user' }, privateKey);
        })
        .then((token) => {
          res.cookie('access', token);
          res.redirect('/');
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
