// Import User model
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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