/* Requirements */
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');

/* Set up server */
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



/* Listen on port 8080 */
app.listen(8080, function(){
	console.log('Server started...');
});