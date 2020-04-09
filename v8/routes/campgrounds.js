// Index Route
var express =   require("express");
var router  =   express.Router();
var campGround=require("../models/campground");

router.get("/",function(req,res){
    campGround.find({},function(err,allCampGrounds){
    if(err) console.log("Error in finding");
    else res.render("campgrounds/index",{campGround:allCampGrounds});
    });   
});

// Create route
router.post("/",function(req,res){
    campGround.create(req.body,function(err,data){
        if(err) console.log("Error Try later!");
        else res.redirect("/campgrounds");
    });
    
});

// New route
router.get("/new",function(req,res){
    res.render("campgrounds/create");
});

// Show route
router.get("/:id",function(req,res){
    var id=req.params.id;
    campGround.findById(id).populate("comments").exec(function(err,foundCampGround){
        if(err) res.send("Error Page Not Found");
        else   
        {
            res.render("campgrounds/show",{campGround : foundCampGround});
        } 
    });
});

module.exports=router;