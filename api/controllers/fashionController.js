'use strict';

// Server-side, handling multipart data can be tricky and error prone, 
//   so we are going to use a utility library called formidable

// Body parser only handles JSON
// Need another library for multiform data


var mongoose = require('mongoose');


var fashionModel = mongoose.model('fashionDB');


exports.getBase = function(req, res) {
  // walmart.testFun("hello world!");
  res.send(JSON.stringify({ Fashion: "Fashion Express Server"}));
};

exports.getMatching = function(req, res) {
 // new formidable.IncomingForm(); // instantiate formidable object
  console.log("********************");
  console.log(req.body.files[0]);
  console.log(req.files);

  res.send(JSON.stringify({ Fashion: "Fashion Express Server"})); 
}

exports.postItem = function(req, res) {
  var clothingItem = new fashionModel({
    label: req.body.label
  });
  clothingItem.save(function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.getAll = function(req, res) {
  fashionModel.find({}, function(err, docs) {
    if (err) res.send(err);
    res.json(docs);
  });
};




