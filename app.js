//jshint esversion:6
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
//use session, passport
const session = require('express-session')
const passport = require('passport')
//user passport Strategy
const FacebookStrategy = require('./authenticate/facebookStrategy')
const GoogleStrategy = require('./authenticate/googleStrategy')
//user model
const User = require('./model/user')
//user route
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const submitRoute = require('./routes/submit')
const secretsRoute = require('./routes/secrets')
const facebookRoute = require('./routes/facebookAuth')
const googleRoute = require('./routes/googleAuth')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))
//set session
app.use(session({
    secret: 'Iamaprofessinaldev',
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
//connect database
mongoose.connect(process.env.DATABASE_URL).then((err)=>{
    if(!err){
        console.log('Connect database successfully')
    }
})

// use static authenticate method of model in LocalStrategy

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
//google auth
passport.use(GoogleStrategy);

//facebook authenticate
passport.use(FacebookStrategy);

//route
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/auth/google",googleRoute)
app.use("/auth/facebook",facebookRoute)
app.use("/secrets",secretsRoute)
app.use("/submit", submitRoute)
//root route
app.get('/', (req, res) => {
    res.render('home')
})
//logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})