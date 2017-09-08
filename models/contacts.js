let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let weatherSchema =  new Schema({

	name : String,
	date : String,
	maxtemp : String,
	mintemp : String
});

let Weather = module.exports = mongoose.model('Weather',weatherSchema);

//module.exports = weather;