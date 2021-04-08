const router = require('express').Router()
const User = require('../models/user')

router.get('/:uid', async(req, res) => {
    const user = await User.findOne({'_id' : { $in : [ req.params.uid ] }})
    res.send(user)
})

module.exports = router