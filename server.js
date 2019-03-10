var express = require('express'); // import express module

var app = express(); // create express app

var port = 3000;

// task = require('./api/models/todoModel'),
var mongoose = require('mongoose')

var bodyParser = require('body-parser'); // Parse incoming request bodies in a 
// middleware before your handlers, available under the req.body property.

// LOAD the created model - task 
// This is necessary or else the Schema won't be registered
var fashionModel = require("./api/models/fashionModel");

var topModel = require("./api/models/TopModel");
var top = require("./api/stores/topSP.js"); // import walmart module
var bottom = require("./api/stores/bottomSP.js"); // import walmart module
var dress = require("./api/stores/dressSP.js"); // import walmart module
var fashion = require("./api/stores/fashionSP.js"); // import walmart module
var shoes = require("./api/stores/shoeSP.js"); // import walmart module

// mongoose instance connectino url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/thrifterLocalDB', { useNewUrlParser: true });

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

  //mongoose.connection.db.collectionNames(function)
});

var cors = require('cors');

// CORS Options
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

  var multer = require('multer');
  // var upload = multer({ dest: 'uploads/' });
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'searchImg/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  
  var upload = multer({ storage: storage });
  var upload2 = multer({ storage: storage2 });

  app.post('/api/thrifter/uploadImg', upload.single('files'), function (req, res, next) {
    console.log("Saved file");
    console.log(req.file);
    // store req.body.filename filename in mongoDBks
    console.log(req.body);
    console.log(req.body.cDesc);
    console.log(req.body.storeName);
    client
    .labelDetection('./uploads/' + req.file.filename)
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');

      // Store state of descriptions in a dictionary
      // Used when filling in the model to update a specific collection
      
      // Assumption: imgs are saved on the backend as png

      var dict = {};
      console.log("*******");
      console.log(req.file.filename);
      dict["Description"] = req.body.cDesc;
      dict["Store"] = req.body.storeName;
      dict["imgFileName"] = req.file.filename;

      labels.forEach(label => {
        if (label.description.indexOf(' ') >= 0) {
          label.description = label.description.replace(" ", ""); 
        }
        if (label.description.indexOf('-') >= 0) {
          label.description = label.description.replace("-", "_");
        }

        var key = label.description;
        var value = Math.floor(label.score * 10000);

        dict[key] = value;
        console.log(key);
        console.log(value);
      });

      // "Post" image data to a collection

      // Top
      console.log(dict);
      if (dict['Top'] || dict['T_shirt'] || dict['Coat'] || dict['Jacket'] || dict['Hoodie']) {
        top.postTopItem(dict);
      } else if (dict['Trousers'] || dict['Jeans'] || dict['Leggings'] || dict['Shorts']) { // bottom
        bottom.postBottomItem(dict);        
      } else if (dict['Dress']) {// dress
        dress.postDressItem(dict);
      } else if (dict['Fashion_Accessory']) { // fashion
        fashion.postFashionItem(dict);
      } else if (dict['Shoe'] || dict['Footwear']) { // shoes
        shoes.postShoeItem(dict);
      } else {
        // 
      }

      res.send(labels);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });

  app.post('/api/thrifter/searchImg', upload2.single('files'), function (req, res, next) {
    console.log("Saved file");
    console.log(req.file);
    // store req.body.filename filename in mongoDBks
    console.log(req.body);
    console.log(req.body.cDesc);
    console.log(req.body.storeName);
    client
    .labelDetection('./searchImg/' + req.file.filename)
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');

      // Store state of descriptions in a dictionary
      // Used when filling in the model to update a specific collection
      
      // Assumption: imgs are saved on the backend as png

      var dict = {};
      console.log("*******");
      console.log(req.file.filename);
      dict["Description"] = req.body.cDesc;
      dict["Store"] = req.body.storeName;
      dict["imgFileName"] = req.file.filename;

      labels.forEach(label => {
        if (label.description.indexOf(' ') >= 0) {
          label.description = label.description.replace(" ", ""); 
        }
        if (label.description.indexOf('-') >= 0) {
          label.description = label.description.replace("-", "_");
        }

        var key = label.description;
        var value = Math.floor(label.score * 10000);

        dict[key] = value;
        console.log(key);
        console.log(value);
      });

      // "Post" image data to a collection

      // Top
      console.log(dict);
      // if (dict['Top'] || dict['Coat'] || dict['Jacket'] || dict['Hoodie']) {
      //   top.postTopItem(dict);
      // } else if (dict['Trousers'] || dict['Jeans'] || dict['Leggings'] || dict['Shorts']) { // bottom
      //   bottom.postBottomItem(dict);        
      // } else if (dict['Dress']) {// dress
      //   dress.postDressItem(dict);
      // } else if (dict['Fashion_Accessory']) { // fashion
      //   fashion.postFashionItem(dict);
      // } else if (dict['Shoe'] || dict['Footwear']) { // shoes
      //   shoes.postShoeItem(dict);
      // } else {
      //   // 
      // }

      res.send(labels);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });

  // app.post('/api/thrifter/uploadImg', function(req, res) {
  //   var upload = multer({
  //       storage: storage}).single('files');
  //   upload(req, res, function(err) {
  //       console.log("File uploaded");
  //       res.end('File is uploaded')
  //   })
  // });

  // app.post('/api/thrifter/uploadImg', upload.single('files'), function (req, res, next) {
  //   console.log(req.file);
  //   const file = req.file;
  //   if (!file) {
  //     const error = new Error('Please upload a file');
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

// Middleware
// app.use(require('body-parser').urlencoded());
// app.use(bodyParser.json()); // for parsing application/json

// app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '150mb',
  extended: true
}));


// CORS on ExpressJS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// import routes
var routes = require('./api/routes/routes');
routes(app); // register the route


app.listen(process.env.PORT || port, function() {
  console.log("CORS-enabled server listening on port %d in %s mode", this.address().port, app.settings.env);
});

console.log("thrifter restful api started on port: " + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

