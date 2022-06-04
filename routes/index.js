const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

// router.use('/', require('./home'));
router.use('/', requiresAuth(), require('./swagger'));
router.use('/users', require('./users'));
router.use('/recipes', requiresAuth(), require('./recipes'));

module.exports = router;
