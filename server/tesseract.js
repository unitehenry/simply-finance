const tesseract = require('node-tesseract-ocr');



exports.transcribe = function transcribeReceipt(path) {
  var res = "";
  const config = {
    lang: 'eng',
    oem: 0,
    psm: 4
  }

  tesseract
    // .recognize('./path/to/image.jpg', config)
    .recognize("./"+path, config)
    .then(text => {
      console.log('Result:', text);
      res = text;
    })
    .catch(err => {
      console.log('error:', err);
    })


    return res;
}