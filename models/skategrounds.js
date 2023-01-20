const { boolean } = require('joi');
const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;
const Atrributes = require('./attributes');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
	return this.url.replace('/upload', '/upload/w_200');
})

const spotSchema = new Schema({
	title: String, 
	image:[ImageSchema],  
	attributes:[
		{
			type: Schema.Types.ObjectId,
			ref:'Attribute'
		}
	],
	description: String, 
	location: String,
	author:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	rails: Boolean,
	reviews: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Review' 
		}
	],	
});

spotSchema.post('findOneAndDelete', async function(doc) {
	console.log("deleted!!!")
	if(doc){
		await Review.deleteMany({ 
			_id: {
				$in: doc.reviews
			}
		})
	}
})
const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
