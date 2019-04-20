var Ngocr = require("Ngocr");


exports.transcribe = function transcribeReceipt(path) {
  var res = "";
  Ngocr.decodeFile("test/fixture/hello_world.png", function(error, data){
    console.log(data); // Hello World!
    res = data;
  });
  

    return res;
}