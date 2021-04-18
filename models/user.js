const mongoose = require('mongoose')

const savedAnalysis = new mongoose.Schema({
    kb : String,
    kd: String,
    ke: String,
    kc: String,
    torque: String,
    length: String,
    q: String,
    qs: String,
    kt: String,
    kts: String,
    fos: String,
    d1: String,
    d2: String,
    g1a: String,
    g2b: String,
    tensile: String,
    ultimate : String,
    finish: String,
    module: String,
    rpm: String,
    torque_gear: String,
    power: String,
    cvt: String,
    hardness : String, //in Brinell
    modulus : String,
    fwidth1 : String,
    fwidth2 : String,
    ko : String,
    Q : String,
    L : String,
    poisson : String,
    process : String, 
    material : String,
    grade : String,
    npinioni : String,
    npinionf : String,
    ngeari : String,
    ngearf : String,
    minFOS : String,
    redi : String,
    redf : String,
}, {strict : false})

const docs = new mongoose.Schema({
    name : String,
    uploaded_at : String,
    slug : String
})

const user = new mongoose.Schema({
    name : String,
    uid : String,
    email: String,
    sessionId: String,
    calculation_Count : String,
    public_ip : String,
    last_calc_elem : String,
    savedAnalysis : [savedAnalysis],
    kind:[
            {
                provider: String,
                id:String
            }
        ],
    docs : [docs],

})

module.exports = mongoose.model('user', user)