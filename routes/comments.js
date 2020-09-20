var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");


router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
        if (err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
        if (err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);;
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }

            });
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