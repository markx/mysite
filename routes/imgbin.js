var express = require('express');
var router = express.Router();

var fs = require('fs');
var formidable = require('formidable');

var mongoose = require('mongoose');
var Image = mongoose.model('Image');

router.get('/', function(req,res) {
    Image.find(function(err, imgs){
	if(err){
	    console.error(err);
	    return next(err);
	}
	else{
	    res.render('imgbin/imgbin', {imgs: imgs});
	}
    }); 
});

router.get('/:id', function(req,res) {
    Image.find({'id': req.params.id}, function(err, img){
	if(err) return next(err);
	res.header('Content-Type', 'image/png');
	res.send(img[0].img);
    });
    
});

router.post('/', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
	if(err){
	    return next(err);
	}
	fs.readFile(files.file.path, function(err, data){
	    if(err) return next(err);
	    var img = new Image();
	    img.img=data;
	    img.save(function(err, saved_img){
		var url = 'http://'+req.get('host')+'/imgbin/'+saved_img.id;
		var ua = req.get('user-agent').toLowerCase();
		if(ua.search('curl')>=0){
		    res.send(url+'\n');
		}
		else{
		    res.redirect(url);
		};
	    });

	});
    });
});

module.exports = router;
