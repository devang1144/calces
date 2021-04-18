var mongoose = require('mongoose');

const reply = new mongoose.Schema({
    author:String,
    authorname: String,
    date: String,
    content:String
})
const query = new mongoose.Schema({
    authorname : String,
    author : String,
    title: String,
    content : String,
    date : String,
    reply : [reply],
    slug : String
})
module.exports = mongoose.model('question',query);