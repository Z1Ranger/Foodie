var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("landing page! - testing server connection")
})

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
})