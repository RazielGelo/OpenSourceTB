const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
  // Local Strategy
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    // Match Username
    let query = { email: email };
    User.findOne(query, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Sorry, we can't find an account with this email address. Please try again or create a new account." });
      }

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Login Failed! Your password is incorrect. Please try again.' });
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
