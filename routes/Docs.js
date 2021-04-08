const router = require('express').Router()
const Storage = require('../helpers/ApiData')
const User = require('../models/user')
//imprt docs model
const Docs = require('../models/saeDocs')

router.post('/:uid', Storage.uploadSAEDocs , async(req, res) => {

    const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})

    const doc = await User.findOneAndUpdate({_id : { $in : [ req.params.uid ] }}, 
            { $push : {
                docs : {
                    name : req.file.originalname,
                    uploaded_at : time,
                    slug : 'docs/' + req.file.filename
                }
            } 
        })

    const savedDoc = await doc.save()
    res.send(savedDoc)
})

router.get('/g/:uid', async(req, res) => {
    const data = await User.findOne({_id : { $in : [ req.params.uid ] }})
    res.send(data.docs)
})

module.exports = router