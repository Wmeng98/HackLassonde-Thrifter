bottomModel = require("../models/BottomModel");
mongoose = require('mongoose');

module.exports = {
  postBottomItem: function(dict) {
    var bottomItem = new bottomModel({
      Description: dict["Description"],
      Store: dict["Store"],
      imgFileName: dict["imgFileName"],
      Trouser: dict ['Trouser'],
      Jeans: dict ['Jeans'],
      Denim: dict ['Denim'],
      Trousers: dict ['Trousers'],
      Pocket: dict ['Pocket'],
      Textile:dict ['Textile'],
      Sportswear: dict ['Sportswear'],
      Active_Pants:dict ['Active_Pants'],
      Sweatpant: dict ['Sweatpant'],
      Camouflage: dict ['Camouflage'],
      Pattern: dict ['Pattern'],
      Design:dict ['Design'],
      Military: dict ['Military'],
      Tights:dict ['Tights'],
      Leggings:dict ['Leggings'],
      Yoga_Pant:dict ['Yoga_Pant'],
      Yellow: dict ['Yellow'],
      Black:dict ['Black'],
      White:dict ['White'],
      Purple: dict ['Purple'],
      Orange:dict['Orange'],
      Light_Blue:dict ['Light_Blue'],
      Red: dict ['Red'],
      Grey: dict ['Grey'],
      Green: dict ['Green'],
      Pink: dict ['Pink'],
      Blue:dict ['Blue'],
      Violet: dict ['Violet'],
      Brown: dict ['Brown'],
      Beige:dict ['Beige']
    });

    bottomItem.save(function(err, item) {
      if (err) res.send(err);
        console.log(item);
    });
  }

}
  