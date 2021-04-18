var router = require('express').Router();
var User = require('../models/user');
const Query = require('../models/query');
var slugify = require('slugify');
var sanitize = require('mongo-sanitize');

router.post('/', async(req,res)=>{
    const title = sanitize(req.body.title);
    const slug = slugify(title,{lower:true});

    const newquery = new Query({
        ID:req.body.ID,
        content:req.body.content,
        date:req.body.date,
        author:req.body.author,
        title:req.body.title,
        slug: slug
    })
    try{
       const savedquery = await newquery.save();
        if(savedquery)return re.status(200).send("query saved"); 
    }catch(err){
        res.send(err);
    }
})
router.get('/', async(req,res)=>{
    const queries = await Query.find({});
    res.send(queries);
})
router.post('/edit', async(req,res)=>{
    try{
        const query = await Query.findByIdAndUpdate(req.body.id,{
            $set:{
                content:req.body.content
            }
        })
        res.send("updated");

    }catch(err){
        res.send(err);
    }
})
router.post('/delete', async(req,res)=>{
    const data = await Query.findByIdAndRemove({_id:req.body.id},console.log("deleted"));
    res.send(data);
})
router.get('/set/:id', async(req,res)=>{
    try{
        var userquery = [];
        const queries = await Query.find({});
        for(let i=0;i<queries.length;i++){
            if(queries[i].author==req.params.id){
                userquery.push(queries[i]);
            }
        }
        res.send(userquery);
    }catch(err){
        res.send(err);
    }
   
})
router.get('/eachquery/:slug', async (req,res)=>{
    try{
        const data = await Query.findOne({slug:req.params.slug});
        if(data)return res.send(data);

    }catch(err){
        res.send(err);
    }
})
router.post('/reply', async(req,res)=>{
    try{
        const reply = await Query.findByIdAndUpdate({_id:req.body.id},{
            $push:{
                reply:{
                    content: req.body.content,
                    author:req.body.author,
                    authorname:req.body.authorname,
                    date:req.body.date
                }
            }
        })
        if(reply)return res.send("Reply added");

    }catch(err){
        return res.send(err);
    }
})
router.post('/reply/delete', async (req, res)=>{
    try{
        const reply = await Query.findByIdAndUpdate({_id: req.body.id},{
            $pull:{
                "reply": {_id: req.body.replyid}
            }
        })
        if(reply)return res.send("reply deleted");
    }catch(err){
        return res.send(err);
    }
})
module.exports = router;