// Import User model
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require("passport");

// For user input sanitation/validation
const { body, validationResult } = require('express-validator');

exports.signup_get = (req, res, next) => {
	res.render('signup', { title: 'Sign Up', msg: '', user: res.locals.currentUser})
}

exports.signup_post = [
    body('confirm-password')
        .custom((value, { req }) => {
            if (value !== req.body.password){
                throw new Error('Passwords do not match!')
            }
            return true;
        }),
    (req, res, next) => {
        // Check if there are errors in the form
        const result = validationResult(req)
        if (!result.isEmpty()){
            const msg = "User failed to sign up!"
            // Pre-fill the sign up form with full name and username
            return res.render('signup', { title: 'Sign Up', msg: [msg, req.body.fullname, req.body.username], user: res.locals.currentUser })
        }

        // If there are no errors, proceed to save new user to database
        try {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err){
                    return next(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        fullName: req.body.fullname,
                        membershipStatus: (req.body.admin ? 'Admin' : 'Non-member')
                    })
                    .save(err => err ? next(err) : res.redirect('/log-in'))
                }
            })
        } catch (err) {
            return next(err)
        }
    }
]

exports.login_get = (req, res) => {
    res.render('login', { title: 'Log In', user: res.locals.currentUser })
}

exports.login_post = passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/'
})

exports.logout_get = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
}