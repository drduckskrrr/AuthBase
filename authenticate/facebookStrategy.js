const User = require('../model/user')
const FacebookStrategy = require('passport-facebook').Strategy;

const FacebookStrategyObj = new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
},
function (accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    User.findOrCreate({
        facebookId: profile.id
    }, function (err, user) {
        return cb(err, user);
    });
}
)
module.exports = FacebookStrategyObj
