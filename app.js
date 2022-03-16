//jshint esversion:6
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const md5 = require('md5')

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
        const password = md5(req.body.password)
        User.findOne({
            //mongoose decrypt the password automatically
            email: username
        }, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                if (doc) {
                    if (doc.password === password) {
                        res.render('secrets')
                    }
                }

            }
        })
    })
app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    })
    newUser.save((err) => {
        //mongoose encrypt the password automatically
        if (!err) {
            res.render('secrets')
        } else {
            console.log(err)
        }
    })
})



app.listen(3000, () => {
    console.log('listening on port 3000')
})