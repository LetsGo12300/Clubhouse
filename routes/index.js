const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

router.get('/', accountsController.index_get);
router.get('/sign-up', accountsController.signup_get);
router.post('/sign-up', accountsController.signup_post);
router.post('/log-in', accountsController.login_post);
router.get('/log-out', accountsController.logout_get);

module.exports = router;
