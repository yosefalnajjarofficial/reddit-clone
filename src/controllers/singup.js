const bcrypt = require('bcrypt');

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
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
