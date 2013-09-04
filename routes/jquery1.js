var PostProvider = require('../postprovider-mongodb').PostProvider;
var postProvider = new PostProvider('localhost', 27017);
  var docs=postProvider.findAll( function(error,docs){
        
        });
    })
});

$(document).ready(function(){
    $("#postdisp").empty9);
    for(post in docs)
    { 
    $("#postdisp").append(post.postdata);
 }
 
});