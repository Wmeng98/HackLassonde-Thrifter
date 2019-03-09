'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fashionSchema = new schema({
  label: {
    type: String,
    required: "Label of clothing item is required"
  }
});

module.exports = mongoose.model('fashionDB', fashionSchema); // specifying to collection name
// db instance provided in the server.js file


