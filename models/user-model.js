const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }

})

mongoose.model("User", user)
