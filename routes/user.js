let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let passport = require('passport');


let csrfProtection = csrf();
router.use(csrfProtection);

//Get the Sign Up component
router.get('/signup', (req, res, next) => {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
//Get User Profile
router.get('/profile', (req, res, next) => {
    res.render('user/profile');
});

module.exports = router;
