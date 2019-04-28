var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Products = require('../models/products.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  Products.find({},(err, prod) => {
    if(err) return res.status(500).send('somthing went wrong')
    res.json(prod)
  })
});
router.post('/', function(req, res, next) {
  res.send(true)
});
router.put('/', function(req, res, next) {
  res.send(true)
});
router.delete('/', function(req, res, next) {
  res.send(true)
});
module.exports = router;
