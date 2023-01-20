const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
	obstacle:{
		type: String,
		required: [true, 'Attribute must have name'],
	}
});

module.exports = mongoose.model("Attribute", attributeSchema);
