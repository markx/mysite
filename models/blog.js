var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var PostSchema = new Schema({
    title : String,
    body : String,
    createdAt: {type: Date, default: Date.now},
    comments: [{
	body: String,
	username: String,
	createdAt: {type: Date, default : Date.now }
    }]
},{collection: 'posts'});

PostSchema.path('title').required(true, 'Blog post title cannot be blank');
PostSchema.path('body').required(true, 'Blog post body cannot be blank');

PostSchema.plugin(autoIncrement.plugin, {model:'Post', field:'id', startAt:1});

mongoose.model('Post', PostSchema);
