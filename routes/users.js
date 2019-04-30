var express = require('express');
var router = express.Router();
var Users = require('../models/user.model');
var jwt = require('jsonwebtoken');
/* GET users listing. */
function isAuthenticated(userID, token) {
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(err){
            return false;
        } else {
            if(userID == decoded.userID){
                return true;
            } else {
                return false;
            }
        }
    });
}

router.get('/', function(req, res, next) {
    
});

router.post('/', function(req, res, next) {
    var dateNow = new Date();
    if(req.body.firstName || req.body.lastName || req.body.email || req.body.password ){
        var user = new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            created: dateNow
        })
        user.save((err, user) => {
            if(err) return res.status(500).send('somthing went wrong')
            res.json(user);
        })
    } else {
        res.json(false);
    }
    
});
router.post('/login', function(req, res, next) {
    Users.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send('somthing went wrong')
        if(user.authenticate(req.body.password)){
            user.password = null;
            user.salt = null;
            var requestObj = {};
            var token = jwt.sign({ userID: user._id }, 'shhhhh');
            requestObj.token = token;
            requestObj.user = user;
            res.json(requestObj);
        } else {
            res.json(false);
        }
    })
});

module.exports = router;
