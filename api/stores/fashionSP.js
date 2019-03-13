fashionModel = require("../models/FashionAccessModel");
mongoose = require('mongoose');

module.exports = {
  postFashionItem: function(dict) {
    var fashionItem = new fashionModel({
      Description: dict["Description"],
      Store: dict["Store"],
      imgFileName: dict["imgFileName"],
      Fashion_accessory: dict ['Fashion_Accessory'],
      Bow_Tie: dict ['Bow_Tie'],
      Black: dict ['Black'],
      Tie: dict ['Tie'],
      Formal_Wear: dict ['Formal_Wear'], 
      Footwear:dict ['Footwear'],
      Sock: dict ['Sock'],
      Boot: dict ['Boot'],
      Shoe: dict ['Shoe'],
      Beanie: dict ['Beanie'],
      Cap: dict ['Cap'],
      Knit_Cap: dict ['Knit_Cap'],
      Headgear: dict ['Headgear'],
      Hat: dict ['Hat'],
      Bonnet: dict ['Bonnet'],
      Yellow: dict ['Yellow'],
      Black: dict ['Black'],
      White: dict['White'],
      Purple: dict ['Purple'],
      Orange: dict ['Orange'],
      Light_Blue: dict ['Light_Blue'],
      Red: dict ['Red'],
      Grey: dict ['Grey'],
      Green: dict ['Green'],
      Pink: dict ['Pink'],
      Blue: dict ['Blue'],
      Violet: dict ['Violet'],
      Brown:dict ['Brown'],
      Beige: dict ['Beige']
    });

    fashionItem.save(function(err, item) {
      if (err) res.send(err);
        console.log(item);
    });
  }

}
  