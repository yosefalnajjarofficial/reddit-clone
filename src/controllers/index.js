const express = require('express');
const { getHome } = require('./home');

const router = express.Router();

router.get('/', getHome);

module.exports = {
  router,
};
