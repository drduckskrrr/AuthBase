
const router = require('express').Router()
const passport = require('passport')
router.get('',
    passport.authenticate('facebook'));

router.get('/secrets',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });
module.exports = router
