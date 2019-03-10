shoeModel = require("../models/ShoeModel");
mongoose = require('mongoose');

module.exports = {
  postShoeItem: function(dict) {
    var shoeItem = new shoeModel({
      Description: dict["Description"],
      Store: dict["Store"],
      imgFileName: dict["imgFileName"],
      Shoe: dict ['Shoe'],
      Footwear: dict ['Footwear'],
      Work_Boots: dict ['Work_Boots'],
      Brown: dict ['Brown'],
      Tan: dict ['Tan'],
      Hiking_Boot: dict ['Hiking_Boot'],
      Steeltoe_Boot:dict ['Steeltoe_Boot'],
      Beige: dict ['Beige'],
      Outdoor_Shoe: dict ['Outdoor_Shoe'],
      Durango_Boot: dict ['Durango_Boot'],
      Snow_Boot: dict ['Snow_Boot'],
      Motorcycle_Boot: dict ['Motorcycle_Boot'],
      Black: dict ['Black'],
      Sneakers: dict ['Sneakers'],
      Walking_Shoe: dict ['Walking_Shoe'],
      Nike_Free:dict ['Nike_Free'],
      Plimsoll_Shoe: dict ['Plimsoll_Shoe'],
      Boot: dict ['Boot'],
      Athletic_Shoe: dict ['Athletic_Shoe'],
      Skate_Shoe: dict ['Skate_Shoe'],
      Leather: dict ['Leather'],
      Sportswear:dict ['Sportswear'],
      Suede: dict ['Suede'],
      Yellow:dict ['Yellow'],
      Black:dict ['Black'],
      White: dict ['White'],
      Purple:dict ['Purple'],
      Orange: dict ['Orange'],
      Light_Blue:dict ['Light_Blue'],
      Red: dict ['Red'],
      Grey: dict ['Grey'],
      Green:dict ['Green'],
      Pink:dict ['Pink'],
      Blue: dict ['Blue'],
      Violet:dict ['Violet'],
      Brown:dict ['Brown']
    });

    shoeItem.save(function(err, item) {
      if (err) res.send(err);
        console.log(item);
    });
  }

}
  