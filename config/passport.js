let passport = require('passport');
let User = require('../models/user');
let LocalStrategy = require('passport-local').Strategy;

//Whenever we want to store the user in the session we use the id which can be retrieved
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
   User.findById(id, (err, user) => {
       done(err, user);
   })
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:6});
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'This E-mail is already in use!!!'});
        }
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            console.log(newUser);
            return done(null, newUser);

        });
    });
}));