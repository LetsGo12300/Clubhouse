const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Log In' });
});

router.get('/sign-up', function(req, res, next) {
	res.render('signup', { title: 'Sign Up' });
});

router.post('/sign-up', userController.signup_post);

module.exports = router;
