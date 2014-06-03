var express = require('express');
var router = express.Router();

var mongoose =require ('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res) {
    Post.find(function (err, objects){
	console.log(objects);
	res.render('blog/blog', { title: 'get title', objects: objects });
    });
});


router.post('/', function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    var post = new Post({ title: title, body: body });
    post.save(function(err, post) {
	if (err) return console.error(err);
	console.log(post);
    });
    res.redirect('/blog/');
    
});

router.get('/create', function(req, res) {
  res.render('blog/create', { title: 'Create' });
});

module.exports = router;
