var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurants");
var Comment = require("../models/comments");


router.get("/restaurants/:id/comments/new", isLoggedIn, function(req, res){
    var id = req.params.id;
    Restaurant.findById(id, function(err, restaurant){
        if (err){
            console.log(err);
        }
        else{
            res.render("comments/new", {restaurant: restaurant});
        }
    })
});

router.post("/restaurants/:id/comments", isLoggedIn, function(req, res){
    var id = req.params.id;
    Restaurant.findById(id, function(err, restaurant){
        if (err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    restaurant.comments.push(comment);;
                    restaurant.save();
                    res.redirect('/restaurants/' + restaurant._id);
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