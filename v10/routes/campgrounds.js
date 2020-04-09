// Index Route
var express =   require("express");
var router  =   express.Router();
var campGround=require("../models/campground");
var User    =   require("../models/user");
var cookieParser    =   require("cookie-parser");
var passport        =   require("passport");

router.get("/",function(req,res){
    campGround.find({},function(err,allCampGrounds){
    if(err) console.log("Error in finding");
    else {
        // var reqses=req.session;
        // console.log(req.user);
        // if(req.user !== undefined)
        // req.session.passport.user="hacker";
            // console.log("user : "+req.session.passport.user);
        // console.log("user : "+req.session.cookie.path);
        // console.log("req.session :"+reqses.path);
        // for(var key in reqses){
        //     console.log(key+" "+reqses[key]);
        // }
        res.render("campgrounds/index",{campGround:allCampGrounds});
    }
    });   
});

// Create route
router.post( "/" , isLoggedIn , function(req,res){
    campGround.create(req.body,function(err,data){
        if(err) console.log("Error Try later!");
        else 
        {
            data.author.id=req.user._id;
            data.author.username=req.user.username;
            data.save();
            console.log(data);
            res.redirect("/campgrounds");   
        }
    });
    
});

// New route
router.get( "/new" , isLoggedIn , function(req,res){
    res.render("campgrounds/create");
    console.log(req.user);
});

// Show route
router.get( "/:id" , isLoggedIn , function(req,res){
    var id=req.params.id;
    campGround.findById(id).populate("comments").exec(function(err,foundCampGround){
        if(err) res.send("Error Page Not Found");
        else   
        {
            console.log(foundCampGround);
            res.render("campgrounds/show",{campGround : foundCampGround,user:req.user});
        } 
    });
});

// Update campground route
router.get( "/:id/edit" , isLoggedIn , function(req,res){
    campGround.findById( req.params.id , function(err,foundCampGround){
        if(err) console.log(err);
        else{
            res.render("campgrounds/edit" , { campGround : foundCampGround });
        }
    })
});

// Post route to update campground
router.put( "/:id" ,isLoggedIn, function(req,res){
    campGround.findByIdAndUpdate( req.params.id , req.body , function( err , updatedCampground ){
        if(err) console.log(err);
        else 
            res.redirect("/campgrounds/"+req.params.id);
    })
});

// Delete route to delete campground
router.delete( "/:id" , isLoggedIn ,function(req,res){
    campGround.findByIdAndRemove( req.params.id , function( err ){
        if(err) console.log(err);
        else 
            res.redirect("/"+req.params.id);
    })

});
function isLoggedIn( req , res , next ){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports=router;