'use strict';

module.exports = function(app) {
  var cors = require('cors');

  // CORS Options
  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

  // *********************************************************************************************************
  // *********************************************************************************************************



  // var multer = require('multer');
  // var upload = multer({ dest: 'uploads/' })



  // SET STORAGE

  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads');
  //     console.log("here");
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '.png')
  //   }
  // });

  // var upload = multer({ storage: storage });

  // app.post('/api/thrifter/uploadfile', upload.single('files'), function (req, res, next) {
  //   console.log("hello there");
  //   const file = req.file
  //   if (!file) {
  //     const error = new Error('Please upload a file')
  //     error.httpStatusCode = 400
  //     return next(error)
  //   }
  //   // run cloud vision api
  //   console.log("fieldname is: " + req.file.fieldname);
  //   client
  //   .labelDetection('./uploads/' + req.file.fieldname + '.png')
  //   .then(results => {
  //     const labels = results[0].labelAnnotations;

  //     console.log('Labels:');
  //     labels.forEach(label => console.log(label.description));
  //     res.send(labels);
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });
  // });
  // *********************************************************************************************************
  // *********************************************************************************************************




  // *********************************************************************************************************
  // *********************************************************************************************************


  var fashionController = require('../controllers/fashionController');

  // base url
  app.route('/')
    .get(fashionController.getBase);
  // **********************************************
  // Thrifter api endpoints

  app.route('/api/thrifter')
    .post(fashionController.postItem);

  app.route('/api/thrifter')  
    .get(fashionController.getAll);

  app.route('/api/thrifter/top')
    .get(fashionController.getTopAll);

};
