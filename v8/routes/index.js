var express =   require("express");
var router  =   express.Router();
var User    =   require("../models/user");
var passport=   require("passport");

// =========== //
//  Auth Route //
// =========== //
router.get("/register",function(req,res){
    res.render("campgrounds/register");
});

//handle sign up logic
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register( newUser , req.body.password , function(err,user){
        if(err)
        {
            console.log("Error in signing up user -> "+err);
            res.redirect("/register");
        } 
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

// ============ //
// Login user   //
// ============ //
router.get("/login",function(req,res){
    res.render("campgrounds/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){});


// Logout user
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports=router;