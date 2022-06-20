const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.joinclub_get)

router.post('/check', userController.joinclub_post)

module.exports = router;
