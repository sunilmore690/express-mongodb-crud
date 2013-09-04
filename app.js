
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var url = require('url');
var PostProvider = require('./postprovider-mongodb').PostProvider;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set("view options", {layout: false});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var postProvider = new PostProvider('localhost', 27017);
app.get('/',routes.index);
  /*function(req, res){
    postProvider.findAll( function(error,docs){
      console.log("posrelatd data"+docs);
        res.render(routes.index, { 
            locals: {
                title: 'Prodonus',
                articles:docs//the posts object go to index.jade
            }
        });
    })
});*/
app.get('/users', user.list);
//after click the post button
var id=0;
//this function call from jquery
app.get('/getposts',function(req,res)
{
postProvider.findAll( function(error,docs){
      console.log("posrelatd data"+docs);
 res.json(docs)
  //res.json(["postid:1,posdata:sunil"]);
    })
});
app.post('/deletepost/:pid', function (req, res){
  console.log("POST: ");
  /*var query = url.parse(request.url, true).query;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var post_data=query.postdata;
  */
  //var id=postProvider.getLastId();
  var post_id=req.params.pid;
  console.log("postid from browser"+post_id)
  postProvider.delete({postid:req.params.pid}, function( error, docs) {
        res.send(docs);
    });
});

app.post('/insertpost', function (req, res){
  console.log("POST: ");
  /*var query = url.parse(request.url, true).query;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var post_data=query.postdata;
  */
  //var id=postProvider.getLastId();
  id+=1;
  postProvider.save({
        postid: id,
        postdata: req.body.postdata
    }, function( error, docs) {
        res.redirect(routes.index);
    });
});

  
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
