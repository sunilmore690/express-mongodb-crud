var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');
   PostProvider = function(host, port) {
  //this.db= new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {safe: true},{ getLastError: 1, w:{$lt:1}}));
  var mongoclient = new MongoClient(new Server("localhost", 27017, {native_parser: true}));
  this.db = mongoclient.db("mongotest");
  this.db.open(function(){});
};
//get posts
PostProvider.prototype.getCollection= function(callback) {
  this.db.collection('posts', function(error, post_collection) {
    if( error ) callback(error);
    else callback(null, post_collection);
  });
};
//toget all posts this function from app.js  in app.get(/getposts)
PostProvider.prototype.findAll = function(callback) {
    console.log("calling to findalll function");
    this.getCollection(function(error, post_collection) {
     
      if( error) callback(error)
      else {
        post_collection.find({},{"_id":0}).toArray(function(error, results) {
           console.dir("postdata from db"+results);
           var dblength=results.length;
           console.log("db length"+dblength);
for( i in results)
{
  console.log("testing "+results[i]);
}
           //var postlength=results.length;
           if(dblength>0)
           {
            var strJson="";
           for(var i=0;i<dblength;)
           {
            console.log("postid"+results[i].postid+"\n");
            console.log("postdata"+results[i].postdata);
            strJson+='{"postid":"'+results[i].postid+'","postdata":"'+results[i].postdata+'"}'
            i=i+1;
            if(i<dblength){strJson+=',';}
            
           }
           console.log("Json data"+JSON.stringify(results));
          if( error ) callback(error)
          else callback(null, JSON.stringify(results));//this results go back to app.js in docs object
        };
      }
    );

}})};
    PostProvider.prototype.delete=function(post_id, callback) {
    this.getCollection(function(error,post_collection) {
      if( error ) callback(error)
      else {
       // console.log("length of articles"+articles.length);
        //if( typeof(posts.length)=="undefined")
         // articles = [articles];
          
        /*for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

*/       //var post_data="{postdata:"+postdata+"}"
//console.log("postdata"+posts);      
console.log("in mongo db provider"+post_id);
post_collection.remove(post_id, function() {
          callback(post_id);
        });
       /*  post_collection.remove(post_id,function (error) {
            if (error) 
            {
                console.log(error);
            } 
            else 
            {
                console.log("deleted product: " + post_id);
               callback(post_id);
            }
        });*/
//post_collection.remove({"postid":post_id},callback(post_id));

 



      }
    });
};
PostProvider.prototype.save = function(posts, callback) {
    this.getCollection(function(error, post_collection) {
      if( error ) callback(error)
      else {
       // console.log("length of articles"+articles.length);
        //if( typeof(posts.length)=="undefined")
         // articles = [articles];
          
        /*for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }
*/       //var post_data="{postdata:"+postdata+"}"
console.log("postdata"+posts);      
  post_collection.save(posts, function() {
          callback(posts);
        });
      }
    });
};

exports.PostProvider = PostProvider;
