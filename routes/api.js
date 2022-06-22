const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/post', messagesController.message_post)
router.delete('/delete/:id', messagesController.message_delete)

module.exports = router;