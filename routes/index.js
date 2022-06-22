const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const messagesController = require('../controllers/messagesController');

router.get('/', messagesController.messages_get);
router.post('/api/post', messagesController.message_post)

router.get('/sign-up', accountsController.signup_get);
router.post('/sign-up', accountsController.signup_post);
router.post('/log-in', accountsController.login_post);
router.get('/log-out', accountsController.logout_get);

module.exports = router;
