'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fashionSchema = new schema({
  Description: {
    type: String,
    default: "No Description"
  },
  Store: {
    type: String,
    default: "No Store"
  },
  imgFileName: {
    type: String,
    default: ""
  },
  Fashion_accessory: {
    type: Number, 
    default: 0
},

Bow_Tie: {
    type: Number, 
    default: 0
},

Black: {
    type: Number, 
    default: 0
},

Tie: {
    type: Number, 
    default: 0
},

Formal_Wear: {
    type: Number, 
    default: 0
},

Footwear: {
    type: Number, 
    default: 0
},

Sock: {
    type: Number, 
    default: 0
},

Boot: {
    type: Number, 
    default: 0
},

Shoe: {
    type: Number, 
    default: 0
},

Beanie: {
    type: Number, 
    default: 0
},

Cap: {
    type: Number, 
    default: 0
},

Knit_Cap: {
    type: Number, 
    default: 0
},

Headgear: {
    type: Number, 
    default: 0
},

Hat: {
    type: Number, 
    default: 0
},

Bonnet: {
    type: Number, 
    default: 0
},


Yellow: {
    type: Number, 
    default: 0
},

Black: {
    type: Number, 
    default: 0
},

White: {
    type: Number, 
    default: 0
},

Purple: {
    type: Number, 
    default: 0
},

Orange: {
    type: Number, 
    default: 0
},

Light_Blue: {
    type: Number, 
    default: 0
},

Red: {
    type: Number, 
    default: 0
},

Grey: {
    type: Number, 
    default: 0
},

Green: {
    type: Number, 
    default: 0
},

Pink: {
    type: Number, 
    default: 0
},

Blue: {
    type: Number, 
    default: 0
},

Violet: {
    type: Number, 
    default: 0
},

Brown: {
    type: Number, 
    default: 0
},

Beige: { 
    type: Number, 
    default: 0
}
}); // collection is necessary here to specify

module.exports = mongoose.model('fashionAccessDB', fashionSchema);