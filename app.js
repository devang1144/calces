//for reading environment variables
const dotenv = require('dotenv')
dotenv.config()

const express= require('express')
const path = require('path')

//create express app
const app= express()

//for cross browser access
const cors = require('cors')

//for SES configuration
const AWS = require('aws-sdk')

//login system library
const passport = require('passport')

//to parse json data
const bodyParser = require('body-parser')

//Cookiesession
const cookieParser = require('cookie-parser'); 
const cookieSession = require('cookie-session');

//database libraries
const mongoose = require('mongoose')

//models

//routes
require('./routes/auth.js');
const ip = require('./routes/ip');
const solver = require('./routes/gears');
const faq = require('./routes/faq');
const Docs = require('./routes/Docs');
const analysis = require('./routes/analysis');
const user = require('./routes/user');
const Query = require('./routes/query');

//Port
const PORT = 9000

let depth_limit = 2; //JSON parse depth 

let limit_depth = (obj, current_depth, limit) => {
    // traversing each key and then checking the depth
    for (const key in obj)
        if (obj[key] instanceof Object)
            if (current_depth + 1 === limit)
                obj[key] = "[object Object]"
            else limit_depth(obj[key], current_depth + 1, limit)
}

//middleware to prevent Mongo injection
// app.use((req, res, next) => {
//     limit_depth(req.body, 0, depth_limit);
//     next()
// })

// const size = Buffer.byteLength(JSON.stringify(obj))

//enable pre-flight
app.options('*', cors())

//Middlewaress
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


//login system middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookie())

//middlewares
app.use('/upload-doc', Docs);
app.use('/record-ip', ip);
app.use('/solve', solver);
app.use('/faq', faq);
app.use('/analysis', analysis);
app.use('/user', user);
app.use('/query',Query);
// app.use('/api', analytics)

//SES config
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.aws_access_key
AWS.config.secretAccessKey = process.env.aws_secret_key
AWS.config.region = process.env.aws_reigon
const email = "devang.iitk@gmail.com"
let ses = new AWS.SES()

// connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"))

app.post('/send-confirmation-mail', async(req, res) => {
  // Aws ses send mail section
  let ses_mail = "From: 'Rotaract Club' <" + email + ">\n"
  ses_mail = ses_mail + "To: " + email + "\n"
  ses_mail = ses_mail + "Subject: A Rotary Story just popped up\n"
  ses_mail = ses_mail + "MIME-Version: 1.0\n"
  ses_mail = ses_mail + "Content-Type: multipart/mixed boundary=\"NextPart\"\n\n"
  ses_mail = ses_mail + "--NextPart\n"
  ses_mail = ses_mail + "Content-Type: text/html charset=us-ascii\n\n"
  ses_mail = ses_mail + "This is should be a html text.\n\n"
  ses_mail = ses_mail + "--NextPart\n"
  ses_mail = ses_mail + "Content-Type: text/plain\n"
  ses_mail = ses_mail + "Content-Disposition: attachment filename=\"Story.txt\"\n\n"
  ses_mail = ses_mail + "Name:"+req.body.name+"\n"+
  "Email:"+req.body.email+"\n"+
  "Title:"+req.body.title+"\n"+
  "Story:"+req.body.story+"\n" + "\n\n"
  ses_mail = ses_mail + "--NextPart--"
  let params = {
      RawMessage: { Data: new Buffer.from(ses_mail) },
      Destinations: [ email ],
      Source: "'Rotaract Club' <" + email + ">'"
    }
  ses.sendRawEmail(params, function(err, data) {
    if(err) {
        res.send(err);
    } 
    else {
        res.send(data);
    }           
  })
  
})

app.get('/success', (req, res) => {
  console.log('success')
  res.send('success')
})

//logout api
app.get('/logout', function(req, res){
  
  req.logout()
  console.log("Logged out!!")
  return res.redirect('/')
})

//google login routes
app.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

//callback route
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.cookie("calcesSSID",req.user._id.toString())
  res.redirect('/d')
})

app.get('/add-project/:file_name', (req,res) => {
    res.sendFile(path.join(__dirname+"/media/project/"+req.params.file_name))
})
  
app.get('/blog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/blog/"+ req.params.blogname + '/' +req.params.file_name))
})
app.get('/docs/:name', (req,res) => {
  res.sendFile(path.join(__dirname+"/SAEDocs/"+ req.params.name ))
})

//download file
app.get('/download/docs/:name', (req, res) => {
  res.download(path.join(__dirname+"/SAEDocs/"+ req.params.name ))
})
//facebook login routes
app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' } ))

//facebook callback route
app.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/' }), (req, res) => {
  res.cookie("calcesSSID",req.user._id.toString())
  res.redirect('/d')
})



app.use(express.static('client/build'))

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
  
app.listen(PORT, function() {
      console.log('App running on port 9000')
}) 
   