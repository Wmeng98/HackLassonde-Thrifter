'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var topSchema = new schema({
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
Tshirt: {
    type: Number,
    default: 0
  },
  
Dress_Shirt: {
    type: Number,
    default: 0
  },
Top: {
    type: Number, 
    default: 0
},
Sportswear: {
    type: Number, 
    default: 0
},

Denim: {
    type: Number, 
    default: 0
},

Jersey: {
    type: Number, 
    default: 0
},

Sleeve: {
    type: Number, 
    default: 0
},

Pattern: {
    type: Number, 
    default: 0
},

Button: {
    type: Number, 
    default: 0
},

Neck: {
    type: Number, 
    default: 0
},

Sweater: {
    type: Number, 
    default: 0
},

Jacket: {
    type: Number, 
    default: 0
},

Design: {
    type: Number, 
    default: 0
},

Hoodie: {
    type: Number, 
    default: 0
},

Suit: {
    type: Number, 
    default: 0
},

Tuxedo: {
    type: Number, 
    default: 0
},

Button: {
    type: Number, 
    default: 0
},

Collar: {
    type: Number, 
    default: 0
},

Sleeve: {
    type: Number, 
    default: 0
},

Coat: {
    type: Number, 
    default: 0
},

Beige: {
    type: Number, 
    default: 0
},

Suit: {
    type: Number, 
    default: 0
},

Outerwear: {
    type: Number, 
    default: 0
},

Zipper: {
    type: Number, 
    default: 0
},

Windbreaker: {
    type: Number, 
    default: 0
},

Polar_Fleece: {
    type: Number, 
    default: 0
},

Rain_Suit: {
    type: Number, 
    default: 0
},

Sleeveless_Shirt: {
    type: Number, 
    default: 0
},

Undershirt:{
    type: Number, 
    default: 0
},

SportsUniform: {
    type: Number, 
    default: 0
},

Vest: {
    type: Number, 
    default: 0
},

Activeshirt: {
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

Infant_Bodysuit: {
    type: Number, 
    default: 0
},

Baby_Products: {
    type: Number, 
    default: 0
},

Sleeve: {
    type: Number, 
    default: 0
},

Font: {
    type: Number, 
    default: 0
}
}); // collection is necessary here to specify

module.exports = mongoose.model('topDB', topSchema);