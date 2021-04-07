const router = require('express').Router()
const FAQ = require('../models/faq')
const slugify = require('slugify')

router.post('/', async(req, res) => {
    const {q, ans} = req.body
    
    const slug = slugify(req.body.q, {lower:true})
    
    const faq = new FAQ({
        q : q,
        ans : ans,
        slug : slug
    })

    const newFaq = await faq.save()
    res.send(newFaq)
})

router.post('/search', async(req, res) => {

    const regex = new RegExp(req.body.q, 'i')
    const data = await FAQ.find({ $and: [{ $or : [{q:regex}, {ans:regex}] }] })
    res.send(data)
})

router.get('/', async(req, res) => {
    const allFaqs = await FAQ.find({})
    res.send(allFaqs)
})

router.get('/:query', async(req, res) => {
    const data = await FAQ.findOne({slug : req.params.query})
    res.send(data)
})

module.exports = router