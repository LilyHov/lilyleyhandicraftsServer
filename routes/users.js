var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Users = require('../models/user.model')
/* GET users listing. */
router.get('/', function(req, res, next) {
    Users.find({}, (err, data) => {
        if(err) return res.status(500).send('somthing went wrong')
res.json(data)
    })
});
router.post('/', function(req, res, next) {
        var dateNow = new Date();
    var user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        created: dateNow
    })
    user.save((err, user) => {
        console.log(err)
        if(err) return res.status(500).send('somthing went wrong')
        res.json(user);
    })
});
router.post('/login', function(req, res, next) {
    
});

module.exports = router;
