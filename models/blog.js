var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title : String,
    body : String,
    createdAt: {type: Date, default: Date.now},
    comments: [{
	body: String,
	username: String,
	createdAt: {type: Date, default : Date.now }
    }]
});

PostSchema.path('title').required(true, 'Blog post title cannot be blank');
PostSchema.path('body').required(true, 'Blog post body cannot be blank');

mongoose.model('Post', PostSchema);
