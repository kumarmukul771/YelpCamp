var mongoose    =require("mongoose");
var campGround  =require("./models/campground");
var Comment     =require("./models/comment");

var data=[
    {
        name:"Mukul4",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-IIia3vGH0zd7b0HqqKSEmEbjwK3Q_qL--Iv-Qp0koAbspgj0",
        desc:"No comments"
    },
    {
        name:"Mukul2",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxKG4VN-6BFgWW38hftFvoaG9z5CEnB78eCKgoEriQ3xxNfqUo",
        desc:"No comments"
    },
    {
        name:"Mukul3",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3gcdeDxYJh_CIocNkwEue5zbQtLBpdwDI1b8ssi782mjuCaCL",
        desc:"No comments"
    }
]
function seedDB(){
    // Remove all campgrounds
    campGround.remove({},function(err){
        if(err) console.log("Error in deletion"+err);
        else 
        {
            console.log("Removed");
            // add a few campgrounds
            data.forEach(function(seed){
                campGround.create(seed,function(err,newCamp){
                    if(err) console.log("An error occured"+err);
                    else 
                    {
                        console.log("Inserted");
                        Comment.create({
                            text:"ABCDEFGHIJKL",
                            author:"MUKUL"
                        },function(err,newComment){
                            if(err) console.log("error in creating comment");
                            else 
                            {
                                newCamp.comments.push(newComment);
                                newCamp.save();
                                console.log("CampGround with comment created");
                            }
                        })
                    }
                })
            });
        }
    });    
}

module.exports = seedDB;