const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

// router.use('/', require('./home'));
router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));

module.exports = router;
