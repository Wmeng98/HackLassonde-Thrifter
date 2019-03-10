dressModel = require("../models/DressModel");
mongoose = require('mongoose');

module.exports = {
  postDressItem: function(dict) {
    var dressItem = new dressModel({
      Description: dict["Description"],
      Store: dict["Store"],
      imgFileName: dict["imgFileName"],
      Dress: dict ['Dress'],
      Skirt:dict ['Skirt'],
      Cocktail_Dress: dict ['Cocktail_Dress'],
      Sleeve: dict['Sleeve'],
      Day_Dress: dict ['Day_Dress'],
      Textile: dict['Textile'],
      Aline: dict ['Aline'],
      Costume: dict ['Costume'],
      Gown: dict['Gown'],
      Formal_Wear: dict ['Formal_Wear'],
      Bridal_Party_Dress: dict ['Bridal_Party_Dress'],
      Strapless_Dress: dict['Strapless_Dress'],
      Wedding_Dress: dict ['Wedding_Dress'], 
      Hoopskirt: dict ['Hoopskirt'],
      Haute_Couture: dict ['Haute_Couture'],
      Embroidery: dict ['Embroidery'],
      Shorts:dict ['Shorts'],
      Pocket: dict ['Pocket'],
      Active_Shorts: dict ['Active_Shorts'],
      Pencil_Skirt:dict['Pencil_Skirt'],
      Cobalt_Blue: dict['Cobalt_Blue'],
      Skort:dict['Skort'],
      Yellow: dict['Yellow'],
      Black: dict['Black'],
      White:dict['White'],
      Purple:dict ['Purple'],
      Orange: dict ['Orange'],
      Light_Blue: dict ['Light_Blue'],
      Red:dict ['Red'],
      Grey: dict ['Grey'],
      Green: dict ['Green'],
      Pink: dict ['Pink'],
      Blue: dict ['Blue'],
      Violet: dict ['Violet'],
      Brown: dict ['Brown'],
      Beige: dict ['Beige']
    });

    dressItem.save(function(err, item) {
      if (err) res.send(err);
        console.log(item);
    });
  }

}
  