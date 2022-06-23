const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const messagesController = require('../controllers/messagesController');

router.get('/', messagesController.messages_get);

router.get('/sign-up', accountsController.signup_get);
router.post('/sign-up', accountsController.signup_post);
router.get('/log-in', accountsController.login_get);
router.post('/log-in', accountsController.login_post);
router.get('/log-out', accountsController.logout_get);

module.exports = router;
