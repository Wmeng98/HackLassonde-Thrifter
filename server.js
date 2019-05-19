var express = require('express'); // import express module

var app = express(); // create express app
var path = require('path');

// KNN library
knn = require('alike');
options = {
  k: 2
}
// weights: {
//   explosions: 0.1,
//   romance: 0.3,
//   length: 0.05,
//   humour: 0.05,
//   pigeons: 0.5
// }

var port = 3000;

// task = require('./api/models/todoModel'),
var mongoose = require('mongoose')

var bodyParser = require('body-parser'); // Parse incoming request bodies in a 
// middleware before your handlers, available under the req.body property.

// mongoose instance connectino url connection
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PWD}@ds119755.mlab.com:19755/mongosandbox`, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/thrifterLocalDB', { useNewUrlParser: true });

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

  //mongoose.connection.db.collectionNames(function)
});

// var cors = require('cors');

// // CORS Options
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


  // app.all('/*', function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   next();
  // });

    // var cors = require('cors');
    // app.use(cors());
    // app.options('*', cors());
  //   // CORS Options
  //   var corsOptions = {
  //     origin: 'http://localhost:3000',
  //     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }



// app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '150mb',
  extended: true
}));


// import routes
// var routes = require('./api/routes/routes');
// routes(app); // register the route

// import controllers
var thrifterAPI = require('./api/controllers/thrifterController');
thrifterAPI(app); // register the controller

app.get('/', function(req, res) {
  res.redirect('/src/thrifter/landing');
});
app.get('/src/thrifter/landing', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/start.html'));
});
app.get('/src/thrifter/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});


app.listen(process.env.PORT || port, function() {
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});

console.log("thrifter restful api started on port: " + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

