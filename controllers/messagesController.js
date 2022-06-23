// Import User and Messages model
const Message = require('../models/Messages');

// For user input sanitation/validation
const { body, validationResult } = require('express-validator');

exports.messages_get = (req, res, next) => {
    // Find all messages in the database
    Message.find()
    .sort({timestamp: -1}) // sort by descending according to timestamp
    .populate('user')
    .then(messages => {
        res.render('index', { title: 'Log In', user: res.locals.currentUser, messages: messages})
    })
    .catch(error => console.error(error))
}

exports.message_post = [
    body('title').trim().not().isEmpty(),
    body('message').trim().not().isEmpty(),
    (req, res, next) => {
        // Check if there are invalid message and title formats
        const result = validationResult(req)
        if (!result.isEmpty()){
            const msg = "Failed to create message. Please try again"
            return res.redirect('/')
        }

        // Create new message
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: res.locals.currentUser
        })

        // Save message to database
        message.save((err, result) => {
            if (err) return next(err);
            // Send new message's details for updating of DOM
            res.status(201).send({
                title: result.title,
                message: result.message,
                user: result.user.fullName,
                userMemStatus: result.user.membershipStatus,
                formatTimestamp: result.formatTimestamp,
                _id: result._id
            })
        })
    }
]

exports.message_delete = (req, res, next) => {
    // Delete message based on message object _id
    Message.findByIdAndDelete(req.params.id, (err) => {
        if (err) return next(err);
        res.status()
    })
    console.log(req.params.id)
    res.status(200).send({message: "Message successfully deleted!"})
}