//todo
//everything you need to get a server up and running
//middleware, routes, database connection etc
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const postRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require("./models/userModel");


mongoose.connect("mongodb://localhost/post");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Configure passport and session middleware
app.use(session({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy()); //Thanks to m-l-p there is no need to create a local strategy
passport.serializeUser(User.serializeUser()); //also it helps here
passport.deserializeUser(User.deserializeUser()); //and here


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use('/post', postRoutes);
app.use('/auth', authRoutes);

app.all('*', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

app.listen(8000, function () {
    console.log("Fullstack Rereddit project. Listening on 8000.")

});