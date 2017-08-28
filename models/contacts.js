let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ContactSchema = mongoose.Schema({
	firstname : String,
	lastname : String,
	phone : Number
});

let Contact = module.exports = mongoose.model('myContact',ContactSchema);
