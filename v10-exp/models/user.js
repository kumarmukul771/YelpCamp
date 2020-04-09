var mongoose                =   require("mongoose");
var passportLocalMongoose   =   require("passport-local-mongoose");

var userSchema              =   new mongoose.Schema({
    username:String,
    dd: String ,
    kk: String 
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("user",userSchema);