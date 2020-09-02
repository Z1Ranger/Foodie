var express = require("express");
const bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Creek", image: "https://img.hipcamp.com/images/c_fill,f_auto,h_600,q_60,w_600/v1445485223/campground-photos/fnqqusfbuyxsyrizknsj/salmon-creek-ranch-redwood-camp-bodega-bay-tent-forest-people.jpg"},
    {name: "Granite Hill", image: "https://s3.amazonaws.com/centralcatalogue001/production/uploads/image/file/2439/MCU671_2_Tenting%20Sites.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampgrounds = {name: name, image: image};
    campgrounds.push(newCampgrounds);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
});

