var express = require("express");
const bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>console.log('Connected to DB!'))
    .catch(error => console.log(error.message))
    ;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("landing");
});


//INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    }); 
});


//CREATE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampgrounds = {name: name, image: image, description: desc};
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
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

//SHOW
app.get("/campgrounds/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
});

