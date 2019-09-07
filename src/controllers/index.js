const express = require('express');
const { getHome } = require('./home');
const { getLogin, postLogin } = require('./login');
const { getSignup, postSignup } = require('./signup');
const { getProfile, postProfile } = require('./profile');
const { postComment } = require('./comments');
const { clientError, serverError } = require('./error');
const { auth } = require('./auth');
const { getCommunity } = require('./community');

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

router.get('/community/:name', getCommunity);

router.use(auth);

router
  .route('/profile')
  .get(getProfile)
  .post(postProfile);

router.post('/comments', postComment);

router.use(clientError);
router.use(serverError);

module.exports = {
  router,
};
