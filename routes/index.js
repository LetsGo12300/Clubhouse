const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index_get);

router.get('/sign-up', userController.signup_get);

router.post('/sign-up', userController.signup_post);

router.post('/log-in', userController.login_post);

router.get('/log-out', userController.logout_get);

module.exports = router;
