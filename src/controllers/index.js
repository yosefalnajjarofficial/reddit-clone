const express = require('express');
const { getHome } = require('./home');
const { getLogin, postLogin } = require('./login');
const { getSignup, postSignup } = require('./singup');
const { getProfile } = require('./profile');

const router = express.Router();

router.get('/', getHome);

router
  .route('/login')
  .get(getLogin)
  .post(postLogin);

router
  .route('/signup')
  .get(getSignup)
  .post(postSignup);

router.get('/profile', getProfile);

module.exports = {
  router,
};
