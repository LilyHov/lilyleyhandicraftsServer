const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const schemaProduct = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  images:  {
    type: String,
  },
  user: {
      type: Schema.ObjectId,
      ref: 'User'
  }
});
module.exports = mongoose.model('Product', schemaProduct);
