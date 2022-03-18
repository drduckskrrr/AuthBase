const router = require('express').Router()
router.route('/')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render('submit')
        } else {
            res.redirect('/login')
        }
    })
    .post((req, res) => {
        const submittedSecret = req.body.secret
        User.findById(req.user.id, (err, user) => {
            if (!err) {
                user.secret = submittedSecret
                user.save(() => {
                    res.redirect('/secrets')
                })
            } else {

            }
        })
    })
module.exports = router