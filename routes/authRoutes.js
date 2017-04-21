//todo
const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const passport = require('passport');


router.post('/register', function (req, res, next) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log('Error registering!', err);
            return next(err);
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }

            res.send({
                username: req.user.username,
                admin: req.user.admin
            });
        });
    });
});
router.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({
        username:req.user.username,
        admin: req.user.admin
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged Out');
});

router.get('/currentuser', function (req, res, next) {
    // console.log("*****currentUser******");
    if (req.user) {
           return res.send({
            username:req.user.username,
            admin: req.user.admin
        })
    }
    res.status(401).send('Doh');


});

module.exports = router;