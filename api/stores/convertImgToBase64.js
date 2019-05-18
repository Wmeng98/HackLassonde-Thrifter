var fs = require('fs');

module.exports = {
  convertToBase64: function(matchResults, res) {
    for (i in matchResults) {
      var base64str = this.base64_encode('./uploads/' + matchResults[i].imgFileName);
      matchResults[i].base64=base64str;
      // remove the image file from the server

    }
    res.send(matchResults);
  },
  // function to encode file data to base64 encoded string
   base64_encode: function(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
  }
}






