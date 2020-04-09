// ================  //
// Comments routes   //
// ================ //
var express     =   require("express");
var router      =   express.Router({ mergeParams : true });
var campGround  =   require("../models/campground");
var comment     =   require("../models/comment");

router.get( "/new" , isLoggedIn , function(req,res){
    campGround.findById( req.params.id , function(err,foundCampGround){
        if(err) console.log("Error in finding camp ground in form show page"+err);
        else res.render("comments/new",{ campGround : foundCampGround });
    });
});

// Create route for comment 
router.post( "/" , isLoggedIn , function(req,res){
    comment.create( req.body.comment , function(err,newComment){
        if(err) console.log("Comment could not be added");
        else 
        {
            campGround.findById( req.params.id , function(err,foundCampGround){
                if(err) console.log(err);
                else{
                    console.log(req.user.username);
                    newComment.author.id=req.user._id;
                    newComment.author.username=req.user.username;
                    newComment.save();
                    console.log(newComment);
                    foundCampGround.comments.push(newComment);
                    foundCampGround.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
});

function isLoggedIn( req , res , next ){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports=router;