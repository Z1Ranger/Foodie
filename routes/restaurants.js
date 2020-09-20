var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurants");

//INDEX
router.get("/restaurants", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        }
        else{
            res.render("restaurants/restaurants", {restaurants: allRestaurants});
        }
    }); 
});


//CREATE
router.post("/restaurants", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newRestaurants = {name: name, image: image, description: desc, author: author};
    Restaurant.create(newRestaurants, function(err, restaurant){
        if (err){
            console.log(err);
        }
        else{
            console.log("NEWLY CREATED Restaurant: ");
            res.redirect("/restaurants");
        }
    });
    
});


//NEW
router.get("/restaurants/new", isLoggedIn, function(req, res){
    res.render("restaurants/new");
})

//SHOW
router.get("/restaurants/:id",function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec( function(err, foundRestaurant){
        if(err){
            console.log(err);
        }
        else{
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    });
});

router.get("/restaurants/:id/edit", checkRestaurantOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        res.render("restaurants/edit", {restaurant: foundRestaurant});
    });           
});

router.put("/restaurants/:id", checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if (err){
            res.redirect("/restaurants");
        }
        else{
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

router.delete("/restaurants/:id", checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/restaurants");
        }
        else{
            res.redirect("/restaurants");
        }
    });
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }   
    res.redirect("/login");
}

function checkRestaurantOwnership(req, res, next){
    if (req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if (err){
                console.log(err);
                res.redirect("back");
            }
            else{
                if (foundRestaurant.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back"); 
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

module.exports = router;