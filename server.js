var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json')

app.set('port', process.env.PORT || 3000)

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if (err){
      console.log(err)
    }
    res.json(JSON.parse(data)); //parse JSON otherwise will receive buffer
  });
});

app.post('/api/comments', function(req, res){
  console.log(req.body)
  fs.readFile(COMMENTS_FILE, function(err, data){
    if (err){
      console.log(err)
    }
    var comments = JSON.parse(data)
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      message: req.body.message,
    };

    comments.push(newComment)

    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err){
        console.log(err)
      }
       res.json(comments);
    })
  })
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});