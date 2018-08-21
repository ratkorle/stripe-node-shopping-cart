let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let passport = require('passport');


let csrfProtection = csrf();
router.use(csrfProtection);

//Get User Profile
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn,  (req, res, next) => {
   req.logout() ;
   res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
   next();
});

//Get the Sign Up component
router.get('/signup', (req, res, next) => {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
//Sign up new User
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
//Get the Login component
router.get('/signin', (req, res, next) => {
    let messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
//Login User
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));
//Log out
router.get('/logout', function(req, res, next) {
    req.logout();
    return res.redirect('/');
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

