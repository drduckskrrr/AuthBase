const router = require('express').Router()
const passport = require('passport')
router.get('',
    passport.authenticate('google', {
        scope: ['profile']
    })
)
router.get('/secrets',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        res.redirect('/secrets');
    });
module.exports = router