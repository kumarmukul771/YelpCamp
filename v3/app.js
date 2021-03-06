var express     =    require("express");
var bodyParser  =    require("body-parser");
var mongoose    =    require("mongoose");
var request     =    require("request");
var app         =    express();
var campGround  =    require("./models/campground");
var seedDB      =    require("./seeds");
var comment     =    require("./models/comment")

seedDB();
// Establish connection with MongoDb
mongoose.connect('mongodb://localhost:27017/yelpCamp',{useNewUrlParser:true,useUnifiedTopology:true});


// For .ejs
app.set("view engine","ejs");
// For request body handling
app.use(bodyParser.urlencoded({extended:true}));

// Index ROute
app.get("/campgrounds",function(req,res){
    campGround.find({},function(err,allCampGrounds){
    if(err) console.log("Error in finding");
    else res.render("index",{campGround:allCampGrounds});
    });   
});

// Create route
app.post("/campgrounds",function(req,res){
    campGround.create(req.body,function(err,data){
        if(err) console.log("Error Try later!");
        else res.redirect("/campgrounds");
    });
    
});

// New route
app.get("/campgrounds/new",function(req,res){
    res.render("create");
});

// Show route
app.get("/campgrounds/:id",function(req,res){
    var id=req.params.id;
    campGround.findById(id).populate("comments").exec(function(err,foundCampGround){
        if(err) res.send("Error Page Not Found");
        else   
        {
            console.log(foundCampGround);
            res.render("show",{campGround : foundCampGround});
        } 
    });
});

// Listening at 3000
app.listen(3000,process.env.IP,function(){console.log("SERVER HAS STARTED")});
