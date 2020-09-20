var express = require("express");
const bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Restaurant = require("./models/restaurants");
var Comment = require("./models/comments");
var User = require("./models/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments"),
restaurantRoutes = require("./routes/restaurants"),
indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/foodie", {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>console.log('Connected to DB!'))
    .catch(error => console.log(error.message))
    ;

seedDB();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Passport Configuration
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use(restaurantRoutes);
app.use(commentRoutes);

app.listen(3000, function(){
    console.log("The Foodie Server Has Started!");
});