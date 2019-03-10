'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var bottomSchema = new schema({
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
Trouser: {
    type: Number, 
    default: 0
},

Jeans: {
    type: Number, 
    default: 0
},

Denim: {
    type: Number, 
    default: 0
},

Trousers: {
    type: Number, 
    default: 0
},

Pocket: {
    type: Number, 
    default: 0
},

Textile: {
    type: Number, 
    default: 0
},

Sportswear: {
    type: Number, 
    default: 0
},

Active_Pants: {
    type: Number, 
    default: 0
},

Sweatpant: {
    type: Number, 
    default: 0
},

Camouflage: {
    type: Number, 
    default: 0
},

Pattern: {
    type: Number, 
    default: 0
},

Design:{
    type: Number, 
    default: 0
},
Military: {
    type: Number, 
    default: 0
},

Tights: {
    type: Number, 
    default: 0
},

Leggings: {
    type: Number, 
    default: 0
},

Yoga_Pant: {
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

module.exports = mongoose.model('bottomDB', bottomSchema);