var express         =    require("express");
var bodyParser      =    require("body-parser");
var mongoose        =    require("mongoose");
var request         =    require("request");
var app             =    express();
var campGround      =    require("./models/campground");
var seedDB          =    require("./seeds");
var comment         =    require("./models/comment")
var passport        =    require("passport");
var LocalStrategy   =    require("passport-local");
var User            =    require("./models/user");

seedDB();
// Establish connection with MongoDb
mongoose.connect('mongodb://localhost:27017/yelpCamp_v6',{useNewUrlParser:true,useUnifiedTopology:true});

// ================== //
// Configure passport
// ================== //
app.use(require("express-session")({
    secret:"Yelp Camp USer",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// For .ejs
app.set("view engine","ejs");
// For request body handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})

// Index ROute
app.get("/campgrounds",function(req,res){
    campGround.find({},function(err,allCampGrounds){
    if(err) console.log("Error in finding");
    else res.render("campgrounds/index",{campGround:allCampGrounds});
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
    res.render("campgrounds/create");
});

// Show route
app.get("/campgrounds/:id",function(req,res){
    var id=req.params.id;
    campGround.findById(id).populate("comments").exec(function(err,foundCampGround){
        if(err) res.send("Error Page Not Found");
        else   
        {
            res.render("campgrounds/show",{campGround : foundCampGround});
        } 
    });
});


// ================  //
// Comments routes   //
// ================ //
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    campGround.findById(req.params.id,function(err,foundCampGround){
        if(err) console.log("Error in finding camp ground in form show page"+err);
        else res.render("comments/new",{campGround:foundCampGround});
    });
});

// Create route for comment 
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    comment.create(req.body.comment,function(err,newComment){
        if(err) console.log("Comment could not be added");
        else 
        {
            campGround.findById(req.params.id,function(err,foundCampGround){
                if(err) console.log(err);
                else{
                    foundCampGround.comments.push(newComment);
                    foundCampGround.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
});

// =========== //
//  Auth Route //
// =========== //
app.get("/register",function(req,res){
    res.render("campgrounds/register");
});

//handle sign up logic
app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
    res.render("campgrounds/login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){});


// Logout user
app.get("/logout",function(req,res){
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
// Listening at 3000
app.listen(8051,process.env.IP,function(){console.log("SERVER HAS STARTED")});