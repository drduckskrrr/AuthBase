const router = require('express').Router()
const User = require('../model/user')
router.get('/', (req, res) => {
    User.find({"secret": {$ne:null}}, (err,user)=>{
        if(err){
            console.log(err);
        }else{
            if(user){
                res.render('secrets', {user})
            }
        }
    })
})
module.exports = router