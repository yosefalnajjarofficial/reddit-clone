const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const { addUser, getUsers } = require('../database/queries/users');
const { schema } = require('../helpers/schema');

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = (req, res, next) => {
  // Validate the form data
  const validate = Joi.validate(req.body, schema);
  if (validate.error === null) {
    // Get tha password to hash it
    const { username, email, password } = req.body;
    // Check for the username and email
    getUsers(username, email)
      .then((result) => {
        if (result.rows[0]) {
          if (result.rows[0].username === username) {
            throw new Error('username is already taken');
          } else {
            throw new Error('this email already exist');
          }
        } else {
          // Hashing the password
          return bcrypt.hash(password, 10);
        }
      })
      .then((hash) => {
        req.body.password = hash;
        // Storing the hashed password and user info
        return addUser(req.body);
      })
      .then((result) => {
        // Get the user id
        const { id } = result.rows[0];

        const privateKey = process.env.PRIVATE_KEY;

        // Give the user an access token
        return jwt.sign({ id, username }, privateKey);
      })
      .then((token) => {
        res.cookie('access', token);
        res.redirect('/');
      })
      .catch((err) => {
        if (err.message.includes('username')) {
          res.render('signup', { message: err.message });
        } else if (err.message.includes('email')) {
          res.render('signup', { message: err.message });
        } else {
          next(err);
        }
      });
  } else {
    const { message } = validate.error.details[0];
    res.render('signup', { message });
  }
};
