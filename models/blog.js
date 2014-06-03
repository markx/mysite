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

mongoose.model('Post', PostSchema);
