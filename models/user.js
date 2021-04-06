const mongoose = require('mongoose')

const history = new mongoose.Schema({
    kb : Number,
    kd: Number,
    ke: Number,
    kc: Number,
    torque: Number,
    length: Number,
    q: Number,
    qs: Number,
    kt: Number,
    kts: Number,
    fos: Number,
    d1: Number,
    d2: Number,
    g1a: Number,
    g2b: Number,
    tensile: Number,
    ultimate : Number,
    finish: Number,
    module: Number,
    rpm: Number,
    torque_gear: Number,
    power: Number,
    cvt: Number,
    hardness : Number, //in Brinell
    modulus : Number,
    fwidth1 : Number,
    fwidth2 : Number,
    ko : Number,
    Q : Number,
    L : Number,
    poisson : Number,
    process : Number, 
    material : Number,
    grade : Number,
    npinioni : Number,
    npinionf : Number,
    ngeari : Number,
    ngearf : Number,
    minFOS : Number,
    redi : Number,
    redf : Number,
}, {strict : false})


const user = new mongoose.Schema({
    name : String,
    uid : String,
    sessionId:String,
    calculation_Count : String,
    public_ip : String,
    last_calc_elem : String,
    history : [history],
    kind:[
            {
                provider: String,
                id:String
            }
        ]

})

module.exports = mongoose.model('user', user)