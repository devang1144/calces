const router = require('express').Router()
const User = require('../models/user')

router.post('/save/:id', async(req, res) => {
    const data = req.body
    
    const thisAnalysis = await User.findByIdAndUpdate(req.params.id, 
        { $push : { 
            savedAnalysis : { 
                "module" : data.module,
                "rpm" : data.rpm,
                "torque" : data.torque,
                "power" : data.power,
                "cvt" : data.cvt,
                "hardness" : data.hardness, //in Brinell
                "modulus" : data.modulus,
                "fwidth1" : data.fwidth1,
                "fwidth2" : data.fwidth2,
                "ko" : data.ko,
                "Q" : data.Q,
                "L" : data.L,
                "poisson" : data.poisson,
                "process" : data.process, 
                "material" : data.Qmaterial,
                "grade" : data.grade,
                "npinioni" : data.npinioni,
                "npinionf" : data.npinionf,
                "ngeari" : data.ngeari,
                "ngearf" : data.ngearf,
                "minFOS" : data.minFOS,
                "redi" : data.redi,
                "redf" : data.redf,
            } 
        
        } 
    }).exec()

    res.send(thisAnalysis)

})
router.get('/saved/:id' , async(req,res)=>{
    const analysis = await User.findById({_id : req.params.id });
    res.send(analysis.savedAnalysis);
})

module.exports = router