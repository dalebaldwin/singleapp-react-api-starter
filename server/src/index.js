// Node Modules Imports

import express from 'express'
import compression from 'compression'
import expressSession from 'express-session'
import expressMongoDB from 'express-mongo-db'
import passport from 'passport'
import { Strategy } from 'passport-github2'

// Node Core Imports (I couldn't find a way around doing it this way, if someone knows how please tell me!)
const path = require('path')

// Internal Imports
import mongoConfig from '../config/mongoConfig'
import authConfig from '../config/authConfig'

// Express Bootup

const app = express()
app.use(expressMongoDB(mongoConfig.atlas))
app.use(expressSession({
    secret: 'MySuperSecretYouCantPossiblyBreakThisKeyOfDoom',
    cookie: { maxAge: 2628000000 },
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
app.use(require('morgan')('dev'))

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

passport.use(new Strategy({
        clientID: authConfig.id,
        clientSecret: authConfig.secret,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    (token, tokenSecret, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        
        return done(null, profile);
    });
    }
))

// Use this to test if you are authed and redirect on failure

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

// Common Routes

app.get('/error', (req,res) => {
    res.sendFile(path.join(__dirname+'/templates/authError.html'))
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname+'/templates/login.html'))
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

app.get('/testapi', ensureAuthenticated, (req, res) => {
    res.send("hi there, if you can see this it means you authed with the app and can access the api!!")
})

// Auth Routes

app.get('/auth/github', 
    passport.authenticate('github', { failureRedirect: '/error'}), 
    (req, res) => {
        res.redirect('/')
    }
)

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/error'}), 
    (req, res) => {
        res.redirect('/')
    }
)

// Dev / Prod Routes Switcher

if (process.env.NODE_ENV === "dev") {
    app.get('/', ensureAuthenticated, (req,res) => {
        res.sendFile(path.join(__dirname+'/templates/devHome.html'))
    })
} else {
    app.use('/', ensureAuthenticated, express.static('../react-app/build'))
    app.use('/*', ensureAuthenticated, express.static('../react-app/build')) 
}

// Start Express Server

app.listen(3000, () => console.log("Single App React + API Starter Example booted up on port 3000"))