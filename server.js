/* Requirements */
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var request = require('request');

const tesseract = require('node-tesseract-ocr');
var imgur = require('imgur');
	// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// http://localhost:8080/transcribeReceipt?image=https://i.imgur.com/tElLPXP.png


/* Set up server */
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



function classify(str) {
	for (var i=0; i<15; i++) {
		str += " " + str;
	}
	// return "Food";

	// Creates a client
	const client = new language.LanguageServiceClient();

	/**
	 * TODO(developer): Uncomment the following line to run this code.
	 */
	// const text = 'Your text to analyze, e.g. Hello, world!';

	// Prepares a document, representing the provided text
	const document = {
	  content: str,
	  type: 'PLAIN_TEXT',
	};

	// Classifies text in the document
	client
	  .classifyText({document: document})
	  .then(results => {
	    const classification = results[0];

	    console.log('Categories:');
	    classification.categories.forEach(category => {
	      console.log(
	        `Name: ${category.name}, Confidence: ${category.confidence}`
	      );
	    });
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
}


app.get('/classifyData', function (req, res) {
	// classify("Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ");
	var inpString = req.query.json;
	var jsObj = JSON.parse(inpString);

	var resJSON = [];



	for (obj in jsObj) {
		// console.log(jsObj[obj].Name + " - " + jsObj[obj].Price);
		// var classifiedItem = classify(jsObj[obj].Name);
		var test = jsObj[obj].Name;
		console.log(test);
		// for (var i=0; i<25; i++) {
		// 	test = test + " " + test;
		// }
		console.log(test);
		classify(test);
		// var temp = {"Name" : jsObj[obj].Name, "Price" : jsObj[obj].Price, "Category" : classifiedItem};
		var temp = {"Name" : jsObj[obj].Name, "Price" : jsObj[obj].Price};
		resJSON.push(temp);
	}
	console.log(resJSON);
	res.send(resJSON);

});




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