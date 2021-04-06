const mongoose = require('mongoose')

const faq = new mongoose.Schema({
    q : String,
    ans : String,
    slug : String
})

module.exports = mongoose.model('FAQ', faq)