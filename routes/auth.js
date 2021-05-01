

const dotenv = require('dotenv');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const refresh = require('passport-oauth2-refresh');
const passport = require('passport');

const sanitize = require('mongo-sanitize');

const base = "https://calces.org.in/"

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(cookieParser());
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

const strategy = new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: base + "google/callback"
},

async (accessToken, refreshToken, profile, done) => {

const email = sanitize(profile.emails[0].value);
const userExist = await User.findOne({ email:email });

if (userExist) {
    return done(null,userExist);
}
else {

    const user = new User({ 
        name : profile.name.givenName,
        uid : profile.displayName,
        email:email,
        calculation_Count : "",
        last_cal_elem : "",
        last_Calculation : [],
        kind:[
            {
                provider:profile.provider,
                id:profile.id
            }
        ],
     })
     
    const savedUser = await user.save();
    return done(null, savedUser)
}  
    })

passport.use(strategy);
refresh.use(strategy);




// You may notice in the url the portion
//  "s64-c" which means the image size to be 64,
//   I've tried using other values like "s100-c"
//    and they worked. Also if you remove the "s64-c" part
//     and append the "?sz=100" parameter, that will also work 
//     as of now. Though this is not very good way of getting the 
//     profile picture of a gplus user, but the advantage is it do not require any api key.


//facebook login
passport.use( new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: base + "facebook/callback",
        profileFields   : ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email' ]
    },
    
    async (accessToken, refreshToken, profile, done) => {

    const name = profile._json.first_name;
    const userExist = await User.findOne({ kind: { $elemMatch : { "id" : profile.id } } });

    if (userExist) {
        
        return done(null,userExist);
    }
    else {

        const user = new User({ 
            name : name,
            uid : name,
            email:"",
            calculation_Count : "",
            last_cal_elem : "",
            last_Calculation : [],
            kind:[
                {
                    provider:profile.provider,
                    id:profile.id
                }
            ],
         })
        const savedUser = await user.save();
        return done(null, savedUser)
    }  
        }
)
);
