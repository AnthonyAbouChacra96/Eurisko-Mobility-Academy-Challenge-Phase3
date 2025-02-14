const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
	title: { type: String, required: true },
	imageUrl: { type: String, required: true },
	content: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref:'User',required:true},
	category: { type: Schema.Types.ObjectId, ref:'Category',required:true},
	
},{timestamps:true});
module.exports=mongoose.model('Feed',feedSchema);
