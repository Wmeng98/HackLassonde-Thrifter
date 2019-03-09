'use strict';

var mongoose = require('mongoose');

var fashionModel = mongoose.model('fashionDB');


exports.getBase = function(req, res) {
  // walmart.testFun("hello world!");
  res.send(JSON.stringify({ Fashion: "Fashion Express Server"}));
};

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




