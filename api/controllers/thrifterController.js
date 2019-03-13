'use strict'

module.exports = function(app) {
  var multer = require('multer');
  // convert png to base64
  var fs = require('fs');
  const base64 = require('../stores/convertImgToBase64');

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'searchImg/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  
  var upload = multer({ storage: storage });
  var upload2 = multer({ storage: storage2 });

  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  
  app.post('/api/thrifter/uploadImg', upload.single('files'), function (req, res, next) {
    console.log("Saved file");
    console.log(req.file);
    // store req.body.filename filename in mongoDBks
    console.log(req.body);
    console.log(req.body.cDesc);
    console.log(req.body.storeName);
    client
    .labelDetection('./uploads/' + req.file.filename)
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');

      // Store state of descriptions in a dictionary
      // Used when filling in the model to update a specific collection
      
      // Assumption: imgs are saved on the backend as png

      var dict = {};
      console.log("*******");
      console.log(req.file.filename);
      dict["Description"] = req.body.cDesc;
      dict["Store"] = req.body.storeName;
      dict["imgFileName"] = req.file.filename;

      labels.forEach(label => {
        if (label.description.indexOf(' ') >= 0) {
          label.description = label.description.replace(/ /g, '_'); 
        }
        if (label.description.indexOf("-") >= 0) {
          console.log("&&&");
          console.log(label.description);
          label.description = label.description.replace(/-/g, '');
          console.log(label.description);
          console.log("&&&");
        }

        var key = label.description;
        var value = Math.floor(label.score * 10000);

        dict[key] = value;
        console.log(key);
        console.log(value);
      });

      // "Post" image data to a collection

      // Top
      console.log(dict);
      if (dict['Top'] || dict['Tshirt'] || dict['Coat'] || dict['Jacket'] || dict['Hoodie']) {
        top.postTopItem(dict);
      } else if (dict['Trousers'] || dict['Jeans'] || dict['Leggings'] || dict['Shorts']) { // bottom
        bottom.postBottomItem(dict);        
      } else if (dict['Dress']) {// dress
        dress.postDressItem(dict);
      } else if (dict['Fashion_accessory']) { // fashion
        fashion.postFashionItem(dict);
      } else if (dict['Shoe'] || dict['Footwear']) { // shoes
        shoes.postShoeItem(dict);
      } else {
        // 
      }

      res.send(labels);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });


  app.post('/api/thrifter/searchImg', upload2.single('files'), function (req, res, next) {
    console.log("Saved file");
    console.log(req.file);
    console.log(req);

    // res.send(req.body)
    // store req.body.filename filename in mongoDBks
    // console.log(req.body.cDesc);
    // console.log(req.body.storeName);
    client
    .labelDetection('./searchImg/' + req.file.filename)
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');

      // Store state of descriptions in a dictionary
      // Used when filling in the model to update a specific collection
      
      // Assumption: imgs are saved on the backend as png

      var dict = {};
      console.log("*******");
      console.log(req.file.filename);
      // dict["Description"] = req.body.cDesc;
      // dict["Store"] = req.body.storeName;
      dict["imgFileName"] = req.file.filename;

      labels.forEach(label => {
        if (label.description.indexOf(' ') >= 0) {
          label.description = label.description.replace(/ /g, '_'); 
        }
        if (label.description.indexOf('-') >= 0) {
          label.description = label.description.replace(/-/g, '');
        }

        var key = label.description;
        var value = Math.floor(label.score * 10000);

        dict[key] = value;
        console.log(key);
        console.log(value);
      });

      // "Post" image data to a collection

      // Top
      console.log(dict);
      console.log("^^^^^^^^^");
      console.log("Closest Match")
      console.log("----------------");
      var objArr = [];
      var matchResults;
      var queryImg;
      if (dict['Top'] || dict['Coat'] || dict['Tshirt'] || dict['Jacket'] || dict['Hoodie']) {

        queryImg = {
          // Description: dict["Description"],
          // Store: dict["Store"],
          // imgFileName: dict["imgFileName"],
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
        }
      
        topModel.find({}, function(err, items) {
          if (err) console.log(err);
          // console.log(items);
          objArr = JSON.parse(JSON.stringify(items));
          console.log(typeof objArr);

          matchResults = knn(queryImg, objArr, options);
          
          base64.convertToBase64(matchResults, res);

        // Grab image corresponding to each objects filename, convert to
        //  bas64 & attach to respective object
        
        // console.log(objArr);
      });
      } else if (dict['Trousers'] || dict['Jeans'] || dict['Leggings'] || dict['Shorts']) { // bottom
        queryImg = {
          // Description: dict["Description"],
          // Store: dict["Store"],
          // imgFileName: dict["imgFileName"],
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
        }
      
        bottomModel.find({}, function(err, items) {
          if (err) console.log(err);
          // console.log(items);
          objArr = JSON.parse(JSON.stringify(items));
          console.log(typeof objArr);

          matchResults = knn(queryImg, objArr, options);
          
          base64.convertToBase64(matchResults, res);
          console.log(matchResults);
          // console.log(objArr);  
        });  
      } else if (dict['Dress']) {// dress
        queryImg = {
          // Description: dict["Description"],
          // Store: dict["Store"],
          // imgFileName: dict["imgFileName"],
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
        }
      
        dressModel.find({}, function(err, items) {
          if (err) console.log(err);
          // console.log(items);
          objArr = JSON.parse(JSON.stringify(items));
          console.log(typeof objArr);

          matchResults = knn(queryImg, objArr, options);
          
          base64.convertToBase64(matchResults, res);
          console.log(matchResults);
          // console.log(objArr); 
        }); 
      } else if (dict['Fashion_accessory']) { // fashion
        queryImg = {
          // Description: dict["Description"],
          // Store: dict["Store"],
          // imgFileName: dict["imgFileName"],
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
        }
      
        fashionAccessModel.find({}, function(err, items) {
          if (err) console.log(err);
          // console.log(items);
          objArr = JSON.parse(JSON.stringify(items));
          console.log(typeof objArr);

          matchResults = knn(queryImg, objArr, options);
          
          base64.convertToBase64(matchResults, res);
          console.log(matchResults);
          // console.log(objArr); 
        }); 
      } else if (dict['Shoe'] || dict['Footwear']) { // shoes
        queryImg = {
          // Description: dict["Description"],
          // Store: dict["Store"],
          // imgFileName: dict["imgFileName"],
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
        }
      
        shoeModel.find({}, function(err, items) {
          if (err) console.log(err);
          // console.log(items);
          objArr = JSON.parse(JSON.stringify(items));
          console.log(typeof objArr);

          matchResults = knn(queryImg, objArr, options);
          
          base64.convertToBase64(matchResults, res);
          console.log(matchResults);
          // console.log(objArr); 
        }); 
      } else {
        // 
      }
      
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });


}