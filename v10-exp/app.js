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
var cookieParser    =    require("cookie-parser");
var methodOverride  =    require("method-override");

// Requiring routes
var campgroundRoutes    =   require("./routes/campgrounds");
var commentRoutes       =   require("./routes/comments");
var indexRoutes         =   require("./routes/index");


// seedDB();
// Establish connection with MongoDb
mongoose.connect('mongodb://localhost:27017/yelpCamp_v10',{useNewUrlParser:true,useUnifiedTopology:true});

// ================== //
// Configure passport
// ================== //
app.use(require("express-session")({
    secret:"fgfg",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));


passport.use(new LocalStrategy(
    (username, password, done) => {
        
        // console.log("ccc");

        User.findOne({username: username},(err,user)=>
        {
            if(err)
            return done(err);

            return done(null,user);
        })
    }
));


passport.serializeUser(function(user, go) {
    // done(null, user.dd);

    // This will send the data in req.session.passport.user
    // done(null, user.id);
    // console.log("aaa");
    go(null, user);
    // console.log("Emilia love Gunjan");
});

passport.deserializeUser((hh,gunjan)=>
{
    // console.log("nnn");
    //This will send the data in req.user
    gunjan(null, hh);
    // console.log("jkjkj");
   
});

// For .ejs
app.set("view engine","ejs");
// For request body handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(cookieParser());

// using currentUser in navbar for all routes
app.use(function(req,res,next){
    // res.locals.currentUser=req.user;
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use( "/campgrounds/:id/comments" , commentRoutes);
app.use(indexRoutes);

// Listening at 3000
app.listen(8051,process.env.IP,function(){console.log("SERVER HAS STARTED")});