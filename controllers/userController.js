// Import User model
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require("passport");

exports.index_get = (req, res, next) => {
    res.render('index', { title: 'Log In', user: req.user });
}

exports.signup_get = (req, res, next) => {
	res.render('signup', { title: 'Sign Up' });
}

exports.signup_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err){
            return next(err);
        } else {
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                fullName: req.body.fullname
            }).save(err => err ? next(err) : res.redirect('/'))
        }
      });
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
      res.redirect("/");
    });
}