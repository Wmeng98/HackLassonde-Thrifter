topModel = require("../models/TopModel");
mongoose = require('mongoose');

module.exports = {
  postTopItem: function(dict) {
    var topItem = new topModel({
      Description: dict["Description"],

      Store: dict["Store"],
      
      imgFileName: dict["imgFileName"],

      Tshirt: dict['Tshirt'],
      Dress_Shirt: dict['Dress_Shirt'], 
      Top: dict['Top'],
      Sportswear: dict['Sportswear'],
    
      Denim: dict['Denim'],
    
      Jersey: dict['Jersey'],
    
      Sleeve: dict['Sleeve'],
    
      Pattern: dict['Pattern'],
    
      Button: dict['Button'],
    
      Neck: dict['Neck'],
    
      Sweater: dict['Sweater'],
    
      Jacket: dict['Jacket'],
    
      Design: dict['Design'],
    
      Hoodie: dict['Hoodie'],
    
      Suit: dict['Suit'],
    
      Tuxedo: dict['Tuxedo'],
    
      Button: dict['Button'],
    
      Collar: dict['Collar'],
    
      Sleeve: dict['Sleeve'],
    
      Coat: dict['Coat'],
    
      Beige: dict['Beige'],
    
      Suit: dict['Suit'],
    
      Outerwear: dict['Outerwear'],
    
      Zipper: dict['Zipper'],
    
      Windbreaker: dict['Windbreaker'],
    
      Polar_Fleece: dict['Polar_Fleece'],
    
      Rain_Suit: dict['Rain_Suit'],
    
      Sleeveless_Shirt: dict['Sleeveless_Shirt'],
    
      Undershirt: dict['Undershirt'],
    
      SportsUniform: dict['SportsUniform'],
    
      Vest: dict['Vest'],

      Activeshirt: dict['Activeshirt'],
    
      Yellow: dict['Yellow'],
    
      Black: dict['Black'],
    
      White: dict['White'],
    
      Purple: dict['Purple'],
    
      Orange: dict['Orange'],
    
      Light_Blue: dict['Light_Blue'],
    
      Red: dict['Red'],
    
      Grey: dict['Grey'],
    
      Green: dict['Green'],
    
      Pink: dict['Pink'],
    
      Blue: dict['Blue'],
    
      Violet: dict['Violet'],
    
      Brown: dict['Brown'],
    
      Infant_Bodysuit: dict['Infant_Bodysuit'],
    
      Baby_Products: dict['Baby_Products'],
    
      Sleeve: dict['Sleeve'],
    
      Font: dict['Font']
    });

    topItem.save(function(err, item) {
      if (err) res.send(err);
        console.log(item);
    });
  }

}
  