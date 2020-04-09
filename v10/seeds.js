var mongoose    =require("mongoose");
var campGround  =require("./models/campground");
var Comment     =require("./models/comment");

var data=[
    {
        name:"Mukul4",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-IIia3vGH0zd7b0HqqKSEmEbjwK3Q_qL--Iv-Qp0koAbspgj0",
        desc:"“People go on about places like Starbucks being unpersonal and all that, but what if that's what you want? I'd be lost if people like that got their way and there was nothing unpersonal in the world. I like to know that there are big places without windows where no one gives a shit. You need confidence to go into small places with regular customers... I'm happiest in the Virgin Megastore and Borders and Starbucks and Pizza Express, where no one gives a shit and no one knows who you are. My mum & dad are always going on about how soulless those places are, and I'm like Der. That's the point.”"
    },
    {
        name:"Mukul2",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxKG4VN-6BFgWW38hftFvoaG9z5CEnB78eCKgoEriQ3xxNfqUo",
        desc:"“People go on about places like Starbucks being unpersonal and all that, but what if that's what you want? I'd be lost if people like that got their way and there was nothing unpersonal in the world. I like to know that there are big places without windows where no one gives a shit. You need confidence to go into small places with regular customers... I'm happiest in the Virgin Megastore and Borders and Starbucks and Pizza Express, where no one gives a shit and no one knows who you are. My mum & dad are always going on about how soulless those places are, and I'm like Der. That's the point.”"
    },
    {
        name:"Mukul3",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3gcdeDxYJh_CIocNkwEue5zbQtLBpdwDI1b8ssi782mjuCaCL",
        desc:"“People go on about places like Starbucks being unpersonal and all that, but what if that's what you want? I'd be lost if people like that got their way and there was nothing unpersonal in the world. I like to know that there are big places without windows where no one gives a shit. You need confidence to go into small places with regular customers... I'm happiest in the Virgin Megastore and Borders and Starbucks and Pizza Express, where no one gives a shit and no one knows who you are. My mum & dad are always going on about how soulless those places are, and I'm like Der. That's the point.”"
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