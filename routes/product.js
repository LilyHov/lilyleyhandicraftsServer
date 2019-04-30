var express = require('express');
var router = express.Router();
var Products = require('../models/products.model');
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Products.find({},(err, prod) => {
    if(err) return res.status(500).send('somthing went wrong')
    res.json(prod)
  })
});
router.get('/lastTen', function(req, res, next) {
  Products.find({}).limit(10).exec((err, prod) => {
    if(err) return res.status(500).send('somthing went wrong')
    res.json(prod)
  })
});
router.get('/details', function(req, res, next) {
  Products.findById(req.query.id).exec((err, prod) => {
    if(err) return res.status(500).send('somthing went wrong')
    res.json(prod)
  })
});
router.post('/', upload.single('file'), function(req, res, next) {
  const product = new Products({
    name: req.body.Name,
    description: req.body.Description,
    category: req.body.Category,
    price: req.body.Price
  });
  product.images.push(`public/images/${req.file.filename}`)
  product.save((err, prod) => {
    if (err) {
      return res.status(400).send('error');
    }
    res.json(prod);
  });
});

router.post('/addImage', upload.single('file'), function(req, res, next) {
  Products.findById(req.body.productID,(err, product) => {
    if (err) {
      return res.status(500).send('error');
    }
    product.images.push(`public/images/${req.file.filename}`)
    product.save((err, prod) => {
      if (err) {
        return res.status(400).send('error');
      }
      res.json(prod);
    });
  })
});
module.exports = router;
