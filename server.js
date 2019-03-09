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

// mongoose instance connectino url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/thrifterLocalDB', { useNewUrlParser: true });

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

  //mongoose.connection.db.collectionNames(function)
});

// Middleware

app.use(bodyParser.json()); // for parsing application/json

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

