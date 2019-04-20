/* Requirements */
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');

const tesseract = require('node-tesseract-ocr');


var TesseractModule = require('./server/tesseract.js');

/* Set up server */
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




app.get('/transcribeReceipt', function(req, res) {
	var query = req.query;
	var path = query.path;

	var text = TesseractModule.transcribe(path);
	if (res == "") {
		console.log("Unable to transcribe picture");
	} else {
		res.send(text);
	}

});


/* Listen on port 8080 */
app.listen(8080, function(){
	console.log('Server started...');
});