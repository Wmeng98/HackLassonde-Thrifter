'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var dressSchema = new schema({
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
Dress: {
    type: Number, 
    default: 0
},

Skirt:{
    type: Number, 
    default: 0
},

Cocktail_Dress: {
    type: Number, 
    default: 0
},

Sleeve: {
    type: Number, 
    default: 0
},

Day_Dress: {
    type: Number, 
    default: 0
},

Textile: {
    type: Number, 
    default: 0
},

Aline: {
    type: Number, 
    default: 0
},

Costume: {
    type: Number, 
    default: 0
},

Gown: {
    type: Number, 
    default: 0
},

Formal_Wear: {
    type: Number, 
    default: 0
},

Bridal_Party_Dress: {
    type: Number, 
    default: 0
},

Strapless_Dress: {
    type: Number, 
    default: 0
},

Sleeve: {
    type: Number, 
    default: 0
},

Wedding_Dress: {
    type: Number, 
    default: 0
},

Hoopskirt: {
    type: Number, 
    default: 0
},

Haute_Couture: {
    type: Number, 
    default: 0
},

Embroidery: {
    type: Number, 
    default: 0
},

Shorts: {
    type: Number, 
    default: 0
},

Pocket: {
    type: Number, 
    default: 0
},

Active_Shorts: {
    type: Number, 
    default: 0
},

Pencil_Skirt: {
    type: Number, 
    default: 0
},

Cobalt_Blue: {
    type: Number, 
    default: 0
},

Skort: {
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

module.exports = mongoose.model('dressDB', dressSchema);