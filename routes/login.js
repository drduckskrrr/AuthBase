const router = require('express').Router()
const passport = require('passport')
router.route('/')
    .get((req, res) => {
        res.render('login')
    })
    .post(passport.authenticate('local', {
            failureRedirect: '/login',
            failureMessage: true
        }),
        (req, res) => {
            res.redirect('/secrets')
        })

module.exports = router