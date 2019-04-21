/* Requirements */
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var request = require('request');

const tesseract = require('node-tesseract-ocr');
var imgur = require('imgur');


/* Set up server */
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());






app.get('/transcribeReceipt', function(req, res) {
	// Link : https://i.imgur.com/tElLPXP.png
	var query = req.query;
	// var path = query.path;
	var url = query.image;
	console.log(url);


	var filename = './resources/imgs/pic.' + url.split('.').pop();

	var writeFileStream = fs.createWriteStream(filename);request(url).pipe(writeFileStream).on('close', function() {
	  console.log(url, 'saved to', filename);
	})



	const config = {
		lang: 'eng',
		oem: 0,
		psm: 4
	}

	
	var promise = tesseract.recognize(filename, config);

	promise.then(function(value){
		var jsonObj = [];
		var lines = value.split("\n");
		lines.forEach(function(line){
			if (/[0-9]/.test(line.slice(-1))) {
				var firstNum = line.match(/\d/);
				var content = [line.substring(0,line.indexOf(firstNum)), line.substring(line.indexOf(firstNum))];
				var temp = {"Name" : content[0], "Price" : content[1]};
				jsonObj.push(temp);
			}
		});
		console.log(jsonObj);
		res.send(jsonObj);
	})
});


/* Listen on port 8080 */
app.listen(8080, function(){
	console.log('Server started...');
});