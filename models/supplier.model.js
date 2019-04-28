const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaSupplier = new Schema({
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
  images: {
    type: String,
  },
});
module.exports = mongoose.model('Supplier', schemaSupplier);
