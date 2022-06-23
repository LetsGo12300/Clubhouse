// Import User model
const User = require('../models/User');

// For user input sanitation/validation
const { body, validationResult } = require('express-validator');

exports.joinclub_get = (req, res) => {
    res.render('join-the-club', { title: 'Join the Club', user: res.locals.currentUser})
}

exports.joinclub_post = [
    body('passcode')
    .custom( value => {
        // clubhouse passcode = bestclubever
        if (value !== 'bestclubever'){
            throw new Error('Incorrect passcode!')
        }
        return true;
    }), 
    (req, res, next) => {
        // Check if passcode is correct or incorrect
        const result = validationResult(req)
        if (!result.isEmpty()){
            const msg = "Incorrect passcode. Please try again"
            return res.redirect('/join-the-club')
        }

        // If passcode is correct, change account to member
        const user = new User(res.locals.currentUser)
        const update = {membershipStatus: 'Member'}
        
        User.findByIdAndUpdate(user._id, update, {}, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        })
    }
]