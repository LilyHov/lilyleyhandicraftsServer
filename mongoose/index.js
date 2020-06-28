const mongoose = require('mongoose')

const env = process.env.NODE_ENV;

const option = require(`../env/${env}`)

mongoose.connect(`${option.dbUrl}/${option.db}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log(err)
        throw ('mongo connect faild')});

console.log('db connected')
module.exports = mongoose;
