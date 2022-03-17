//jshint esversion:6
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds=10

const app = express()

mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema = new mongoose.Schema( {
    email: String,
    password: String
})


const User = mongoose.model('User', userSchema)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.render('home')
})
app.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        
        const username = req.body.username
        const password = req.body.password
        User.findOne({
            //mongoose decrypt the password automatically
            email: username
        }, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                if (doc) {
                    bcrypt.compare(password, doc.password, function(err, result) {
                        if(result===true){
                            res.render('secrets')
                        }
                    });
                }

            }
        })
    })
app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
        newUser.save((err) => {
            //mongoose encrypt the password automatically
            if (!err) {
                res.render('secrets')
            } else {
                console.log(err)
            }
        })
    });
    
})



app.listen(3000, () => {
    console.log('listening on port 3000')
})