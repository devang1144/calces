var mongoose = require('mongoose');

const reply = new mongoose.Schema({
    author:String,
    ID: String,
    date: String,
    content:String,
    likes : String
})
const query = new mongoose.Schema({
    author : String,
    ID : String,
    title: String,
    content : String,
    date : String,
    reply : [reply],
    slug : String,
    likes : String
})
module.exports = mongoose.model('question',query);