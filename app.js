const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require('bcryptjs');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const jointheclubRouter = require('./routes/join-the-club');

// Add dotenv config
dotenv.config()

// Import models from folder
const User = require('./models/User');
const Messages = require('./models/Messages');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.53gsr.mongodb.net/Clubhouse?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
)

// Check if connected to database:
const db = mongoose.connection
db.once('open', _ => {
  console.log('Connected to Database')
})
db.on('error', err => {
  console.error('connection error:', err)
})

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use bootstrap files
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

// Add favicon
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));

// Import middleware for express-session and passport
app.use(session({ secret: `${process.env.SESSION_SECRET}`, cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
            }
          })
      });
    })
  );

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Access the user object from anywhere
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/join-the-club', jointheclubRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'ERROR', user: res.locals.currentUser});
});

module.exports = app;
