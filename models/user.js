const mongoose = require('mongoose')

const lastCalculation = new mongoose.Schema({
    fos : String
})

const kind = new mongoose.Schema({
    provider: String,
    id:String
})

const user = new mongoose.Schema({
    name : String,
    uid : String,
    sessionId: String,
    calculation_Count : String,
    last_cal_elem : String,
    last_Calculation : [lastCalculation],
    kind:[kind]
})

module.exports = mongoose.model('user', user)