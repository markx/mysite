var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var ImageSchema = new Schema({
    img: {type:Buffer, contentType: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

ImageSchema.plugin(autoIncrement.plugin, {model:'Image', field:'id', startAt:1});
mongoose.model("Image", ImageSchema);


