var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();

//Home
router.get("/", function(req, res){
    res.render("landing");
});

//show register form 
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic 
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/restaurants");
        })
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {successRedirect: "/restaurants",
    failureRedirect: "/login"
    }), function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/restaurants");
})

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }   
    res.redirect("/login");
}

module.exports = router;