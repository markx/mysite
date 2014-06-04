var express = require('express');
var router = express.Router();

var mongoose =require ('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res) {
    Post.find(function (err, objects){
	res.render('blog/blog', { title: 'get title', objects: objects });
    });
});


router.post('/', function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    var post = new Post({ title: title, body: body });
    post.save(function(err, post) {
	if (err) {
	    console.log(err);
	    res.render('blog/create', {post_title: title, post_body: body, error: err});
	}
	else
	{
	    res.redirect('/blog/');
	}
    });
    
});

router.get('/bd/create', function(req, res) {
  res.render('blog/create');
});

module.exports = router;
