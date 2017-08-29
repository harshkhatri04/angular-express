 //importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connect
mongoose.connection.on('connected',()=>{
	console.log('connected to db')
})

mongoose.connection.on('error',(err)=>{
	if(err)
	{
		console.log('error in connecting db:'+err);
	}
})

//port 
const port = 8090;

//adding middleware -cors
app.use(cors());

//body - parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

//static files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api',route);

//testing server
app.get('/',(req,res)=>{
	 res.send('testing server')
})

app.listen(port,()=> {
  console.log('app listening on port 8090!')
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

module.exports = function(){
	return 'hello';
}
