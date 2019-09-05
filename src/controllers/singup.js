const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const { addUser } = require('../database/queries/users');
const { schema } = require('../helpers/schema');

exports.getSignup = (req, res) => {
  res.render('singup');
};

exports.postSignup = (req, res) => {
  // Validate the form data
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
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
            // Get the user id
            const { id, username } = result.rows[0];
            console.log(id);
            // Give the user an access token
            const privateKey = process.env.PRIVATE_KEY;
            jwt.sign({ id, username }, privateKey, (err, token) => {
              res.cookie('access', token);
              res.redirect('/');
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    const { message } = result.error.details[0];
    res.render('singup', { message });
  }
};
