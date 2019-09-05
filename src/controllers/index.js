const express = require('express');
const { getHome } = require('./home');
const { getLogin, postLogin } = require('./login');
const { getSignup, postSignup } = require('./singup');
const { getProfile, postProfile } = require('./profile');
const { postComment } = require('./comments');

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

router
  .route('/profile')
  .get(getProfile)
  .post(postProfile);

router.post('/comments', postComment);

module.exports = {
  router,
};
