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



async function classify(str) {
	const client = new language.LanguageServiceClient();
	const document = {content: str,type: 'PLAIN_TEXT',};

	return new Promise((resolve, reject) =>{
		var thePromise = client.classifyText({document: document}).then(results => {
		    const classification = results[0];

		    classification.categories.forEach(category => {
				resolve(category.name.substring(1, category.name.substring(2).indexOf('/')+2));
		    });
		}).catch(err => {
			console.error('ERROR:', err);
		});
	});
}

async function addCategory(jsObj) {
	var resJSON = [];

	return new Promise((resolve, reject) =>{


		for (obj in jsObj) {
			var test = jsObj[obj].Name;
			console.log(test);
			for (var i=0; i<5; i++) {
				test = test + " " + test;
			}
			const category = classify(test);
			var temp = {"Name" : jsObj[obj].Name, "Price" : jsObj[obj].Price, "Category" : category};
			resJSON.push(temp);
		}
		resolve(resJSON);

	});

}


app.get('/classifyData', async function (req, res) {
	// classify("Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ");
	var inpString = req.query.json;
	var jsObj = JSON.parse(inpString);


	var results = [];
	results = await addCategory(jsObj);
	console.log(results);


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