const mongoose = require('mongoose')

const lastCalculation = new mongoose.Schema({
    fos : String
})

const user = new mongoose.Schema({
    name : String,
    uid : String,
    sessionId:String,
    calculation_Count : String,
    last_cal_elem : String,
    last_Calculation : [lastCalculation]

})

module.exports = mongoose.model('user', user)