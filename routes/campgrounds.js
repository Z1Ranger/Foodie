var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//INDEX
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
        }
    }); 
});


//CREATE
router.post("/campgrounds", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampgrounds, function(err, campground){
        if (err){
            console.log(err);
        }
        else{
            console.log("NEWLY CREATED CAMPGROUND: ");
            res.redirect("/campgrounds");
        }
    });
    
});


//NEW
router.get("/campgrounds/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

//SHOW
router.get("/campgrounds/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }   
    res.redirect("/login");
}

module.exports = router;