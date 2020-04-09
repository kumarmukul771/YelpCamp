var mongoose  =require("mongoose");

var campSchema=new mongoose.Schema({
    name:String,
    image:String,
    desc:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});

module.exports=mongoose.model("campGround",campSchema);