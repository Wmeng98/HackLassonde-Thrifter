'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var shoeSchema = new schema({
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
  Shoe: {
    type: Number, 
    default: 0
  },
  
  Footwear: {
    type: Number, 
    default: 0
  },
  
  Work_Boots: {
    type: Number, 
    default: 0
  },
  
  Brown: {
    type: Number, 
    default: 0
  },
  
  Tan: {
    type: Number, 
    default: 0
  },
  
  Hiking_Boot: {
    type: Number, 
    default: 0
  },
  
  Steeltoe_Boot: {
    type: Number, 
    default: 0
  },
  
  Beige: {
    type: Number, 
    default: 0
  },
  
  Outdoor_Shoe: {
    type: Number, 
    default: 0
  },
  
  Durango_Boot: {
    type: Number, 
    default: 0
  },
  
  Snow_Boot: {
    type: Number, 
    default: 0
  },
  
  Motorcycle_Boot: {
    type: Number, 
    default: 0
  },
  
  Black: {
    type: Number, 
    default: 0
  },
  
  Sneakers: {
    type: Number, 
    default: 0
  },
  
  Walking_Shoe: {
    type: Number, 
    default: 0
  },
  
  Nike_Free: {
    type: Number, 
    default: 0
  },
  
  Plimsoll_Shoe: {
    type: Number, 
    default: 0
  },
  
  Boot: {
    type: Number, 
    default: 0
  },
  
  Athletic_Shoe: {
    type: Number, 
    default: 0
  },
  
  Skate_Shoe: {
    type: Number, 
    default: 0
  },
  
  Leather: {
    type: Number, 
    default: 0
  },
  
  Sportswear: {
    type: Number, 
    default: 0
  },
  
  Suede: {
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
  } 
}); // collection is necessary here to specify

module.exports = mongoose.model('shoeDB', shoeSchema);
