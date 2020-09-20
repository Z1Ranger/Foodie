var mongoose = require("mongoose");
var Restaurant = require("./models/restaurants");
var Comment   = require("./models/comments");
 
var data = [
    {
        name: "Figs & Olives", 
        image: "https://www.foodpoisonjournal.com/files/2015/09/fig-and-olive.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Vishnu"
        }
    },
    {
        name: "Taj", 
        image: "https://media.blogto.com/uploads/2017/05/08/20170506-2048-Taj5.jpg?h=2500&cmd=resize&quality=70&w=1400",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Ayan"
        }
    },
    {
        name: "Scaddabush", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/db/4b/b0/el-restaurante.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jacob"
        }
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Restaurant.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed restaurants!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few restaurants
            data.forEach(function(seed){
                Restaurant.create(seed, function(err, restaurant){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a restaurant");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Vishnu"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    restaurant.comments.push(comment);
                                    restaurant.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        })
    }); 
    //add a few comments
}
 
module.exports = seedDB;