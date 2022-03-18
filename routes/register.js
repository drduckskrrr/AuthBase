const router = require('express').Router()

router.route('/')
.get((req, res) => {
    res.render('register')
})
.post((req, res) => {
    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
})

module.exports = router