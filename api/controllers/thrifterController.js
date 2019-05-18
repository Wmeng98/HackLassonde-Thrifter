'use strict'

module.exports = function(app) {
  // LOAD the created model - task 
  // This is necessary or else the Schema won't be registered
  var fashionModel = require("../models/fashionModel");

  var topModel = require("../models/TopModel");
  var bottomModel = require("../models/BottomModel");
  var dressModel = require("../models/DressModel");
  var fashionAccessModel = require("../models/FashionAccessModel");
  var shoeModel = require("../models/ShoeModel");

  var top = require("../stores/topSP.js"); // import walmart module
  var bottom = require("../stores/bottomSP.js"); // import walmart module
  var dress = require("../stores/dressSP.js"); // import walmart module
  var fashion = require("../stores/fashionSP.js"); // import walmart module
  var shoes = require("../stores/shoeSP.js"); // import walmart module

  // KNN library
  knn = require('alike');
  options = {
    k: 2
  }
  // weights: {
  //   explosions: 0.1,
  //   romance: 0.3,
  //   length: 0.05,
  //   humour: 0.05,
  //   pigeons: 0.5
  // }

  var multer = require('multer');
  // convert png to base64
  var fs = require('fs');
  const base64 = require('../stores/convertImgToBase64');
  const calcMatch = require('../stores/calculateMatch');

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
    if (req.file) {
      client
      .labelDetection('./searchImg/' + req.file.filename)
      .then(results => {
        const labels = results[0].labelAnnotations;

        // delete search image from the server
        const searchImgPath = './searchImg/' + req.file.filename;
        
        console.log('Labels:');
  
        // Store state of descriptions in a dictionary
        // Used when filling in the model to update a specific collection
        
        // Assumption: imgs are saved on the backend as png before processing by GCP API
        // Then deleted once processed
  
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
            Tshirt: (dict['Tshirt'] == null ? 0 : dict['Tshirt']),
            Dress_Shirt: (dict['Dress_Shirt'] == null ? 0 : dict['Dress_Shirt']), 
            Top: (dict['Top'] == null ? 0 : dict['Top']),
            Sportswear: (dict['Sportswear'] == null ? 0 : dict['Sportswear']), 
            Denim: (dict['Denim'] == null ? 0 : dict['Denim']),
            Jersey: (dict['Jersey'] == null ? 0 : dict['Jersey']),
            Sleeve: (dict['Sleeve'] == null ? 0 : dict['Sleeve']),
          
            Pattern: (dict['Pattern'] == null ? 0 : dict['Pattern']),
          
            Button: (dict['Button'] == null ? 0 : dict['Button']),
          
            Neck: (dict['Neck'] == null ? 0 : dict['Neck']),
          
            Sweater: (dict['Sweater'] == null ? 0 : dict['Sweater']),
          
            Jacket: (dict['Jacket'] == null ? 0 : dict['Jacket']),
          
            Design: (dict['Design'] == null ? 0 : dict['Design']),
          
            Hoodie: (dict['Hoodie'] == null ? 0 : dict['Hoodie']),
          
            Suit: (dict['Suit'] == null ? 0 : dict['Suit']),
          
            Tuxedo: (dict['Tuxedo'] == null ? 0 : dict['Tuxedo']),
          
            Button: (dict['Button'] == null ? 0 : dict['Button']),
          
            Collar: (dict['Collar'] == null ? 0 : dict['Collar']),
          
            Sleeve: (dict['Sleeve'] == null ? 0 : dict['Sleeve']),
          
            Coat: (dict['Coat'] == null ? 0 : dict['Coat']),
          
            Beige: (dict['Beige'] == null ? 0 : dict['Beige']),
          
            Suit: (dict['Suit'] == null ? 0 : dict['Suit']),
          
            Outerwear: (dict['Outerwear'] == null ? 0 : dict['Outerwear']),
          
            Zipper: (dict['Zipper'] == null ? 0 : dict['Zipper']),
          
            Windbreaker: (dict['Windbreaker'] == null ? 0 : dict['Windbreaker']),
          
            Polar_Fleece: (dict['Polar_Fleece'] == null ? 0 : dict['Polar_Fleece']),
          
            Rain_Suit: (dict['Rain_Suit'] == null ? 0 : dict['Rain_Suit']),
          
            Sleeveless_Shirt: (dict['Sleeveless_Shirt'] == null ? 0 : dict['Sleeveless_Shirt']),
          
            Undershirt: (dict['Undershirt'] == null ? 0 : dict['Undershirt']),
          
            SportsUniform: (dict['SportsUniform'] == null ? 0 : dict['SportsUniform']),
          
            Vest: (dict['Vest'] == null ? 0 : dict['Vest']),
      
            Activeshirt: (dict['Activeshirt'] == null ? 0 : dict['Activeshirt']),
          
            Yellow: (dict['Yellow'] == null ? 0 : dict['Yellow']),
          
            Black: (dict['Black'] == null ? 0 : dict['Black']),
          
            White: (dict['White'] == null ? 0 : dict['White']),
          
            Purple: (dict['Purple'] == null ? 0 : dict['Purple']),
          
            Orange: (dict['Orange'] == null ? 0 : dict['Orange']),
          
            Light_Blue: (dict['Light_Blue'] == null ? 0 : dict['Light_Blue']),
          
            Red: (dict['Red'] == null ? 0 : dict['Red']),
          
            Grey: (dict['Grey'] == null ? 0 : dict['Grey']),
          
            Green: (dict['Green'] == null ? 0 : dict['Green']),
          
            Pink: (dict['Pink'] == null ? 0 : dict['Pink']),
          
            Blue: (dict['Blue'] == null ? 0 : dict['Blue']),
          
            Violet: (dict['Violet'] == null ? 0 : dict['Violet']),
            Brown: (dict['Brown'] == null ? 0 : dict['Brown']),
            Infant_Bodysuit: (dict['Infant_Bodysuit'] == null ? 0 : dict['Infant_Bodysuit']),
            Baby_Products: (dict['Baby_Products'] == null ? 0 : dict['Baby_Products']),
            Sleeve: (dict['Sleeve'] == null ? 0 : dict['Sleeve']),
            Font: (dict['Font'] == null ? 0 : dict['Font'])
          } // Also need this conditional check for KNN algorithm to run

        
          topModel.find({}, function(err, items) {
            if (err) console.log(err);
            // console.log(items);
            objArr = JSON.parse(JSON.stringify(items));
            console.log(typeof objArr);

            matchResults = knn(queryImg, objArr, options);

            for (var i in matchResults) {
              matchResults[i].percentFloorMatch=calcMatch.calculatePercentageMatch(queryImg, matchResults[i]);
            }
            
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
            Trouser: (dict['Trouser'] == null ? 0 : dict['Trouser']),
            Jeans: (dict['Jeans'] == null ? 0 : dict['Jeans']),
            Denim: (dict['Denim'] == null ? 0 : dict['Denim']),
            Trousers: (dict['Trousers'] == null ? 0 : dict['Trousers']),
            Pocket: (dict['Pocket'] == null ? 0 : dict['Pocket']),
            Textile:(dict['Textile'] == null ? 0 : dict['Textile']),
            Sportswear: (dict['Sportswear'] == null ? 0 : dict['Sportswear']),
            Active_Pants:(dict['Active_Pants'] == null ? 0 : dict['Active_Pants']),
            Sweatpant: (dict['Sweatpant'] == null ? 0 : dict['Sweatpant']),
            Camouflage: (dict['Camouflage'] == null ? 0 : dict['Camouflage']),
            Pattern: (dict['Pattern'] == null ? 0 : dict['Pattern']),
            Design:(dict['Design'] == null ? 0 : dict['Design']),
            Military: (dict['Military'] == null ? 0 : dict['Military']),
            Tights:(dict['Tights'] == null ? 0 : dict['Tights']),
            Leggings:(dict['Leggings'] == null ? 0 : dict['Leggings']),
            Yoga_Pant:(dict['Yoga_Pant'] == null ? 0 : dict['Yoga_Pant']),
            Yellow: (dict['Yellow'] == null ? 0 : dict['Yellow']),
            Black:(dict['Black'] == null ? 0 : dict['Black']),
            White:(dict['White'] == null ? 0 : dict['White']),
            Purple: (dict['Purple'] == null ? 0 : dict['Purple']),
            Orange:dict['Orange'],
            Light_Blue:(dict['Light_Blue'] == null ? 0 : dict['Light_Blue']),
            Red: (dict['Red'] == null ? 0 : dict['Red']),
            Grey: (dict['Grey'] == null ? 0 : dict['Grey']),
            Green: (dict['Green'] == null ? 0 : dict['Green']),
            Pink: (dict['Pink'] == null ? 0 : dict['Pink']),
            Blue:(dict['Blue'] == null ? 0 : dict['Blue']),
            Violet: (dict['Violet'] == null ? 0 : dict['Violet']),
            Brown: (dict['Brown'] == null ? 0 : dict['Brown']),
            Beige:(dict['Beige'] == null ? 0 : dict['Beige'])
          }
        
          bottomModel.find({}, function(err, items) {
            if (err) console.log(err);
            // console.log(items);
            objArr = JSON.parse(JSON.stringify(items));
            console.log(typeof objArr);
  
            matchResults = knn(queryImg, objArr, options);
            
            for (var i in matchResults) {
              matchResults[i].percentFloorMatch=calcMatch.calculatePercentageMatch(queryImg, matchResults[i]);
            }

            base64.convertToBase64(matchResults, res);
            console.log(matchResults);
            // console.log(objArr);  
          });  
        } else if (dict['Dress']) {// dress
          queryImg = {
            // Description: dict["Description"],
            // Store: dict["Store"],
            // imgFileName: dict["imgFileName"],
            Dress: (dict ['Dress'] == null ? 0 : dict ['Dress']),
            Skirt:(dict ['Skirt'] == null ? 0 : dict ['Skirt']),
            Cocktail_Dress: (dict ['Cocktail_Dress'] == null ? 0 : dict ['Cocktail_Dress']),
            Sleeve: (dict['Sleeve'] == null ? 0 : dict['Sleeve']),
            Day_Dress: (dict ['Day_Dress'] == null ? 0 : dict ['Day_Dress']),
            Textile: (dict['Textile'] == null ? 0 : dict['Textile']),
            Aline: (dict ['Aline'] == null ? 0 : dict ['Aline']),
            Costume: (dict ['Costume'] == null ? 0 : dict ['Costume']),
            Gown: (dict['Gown'] == null ? 0 : dict['Gown']),
            Formal_Wear: (dict ['Formal_Wear'] == null ? 0 : dict ['Formal_Wear']),
            Bridal_Party_Dress: (dict ['Bridal_Party_Dress'] == null ? 0 : dict ['Bridal_Party_Dress']),
            Strapless_Dress: (dict['Strapless_Dress'] == null ? 0 : dict['Strapless_Dress']),
            Wedding_Dress: (dict ['Wedding_Dress'] == null ? 0 : dict ['Wedding_Dress']), 
            Hoopskirt: (dict ['Hoopskirt'] == null ? 0 : dict ['Hoopskirt']),
            Haute_Couture: (dict ['Haute_Couture'] == null ? 0 : dict ['Haute_Couture']),
            Embroidery: (dict ['Embroidery'] == null ? 0 : dict ['Embroidery']),
            Shorts:(dict ['Shorts'] == null ? 0 : dict ['Shorts']),
            Pocket: (dict ['Pocket'] == null ? 0 : dict ['Pocket']),
            Active_Shorts: (dict ['Active_Shorts'] == null ? 0 : dict ['Active_Shorts']),
            Pencil_Skirt:(dict['Pencil_Skirt'] == null ? 0 : dict['Pencil_Skirt']),
            Cobalt_Blue: (dict['Cobalt_Blue'] == null ? 0 : dict['Cobalt_Blue']),
            Skort:(dict['Skort'] == null ? 0 : dict['Skort']),
            Yellow: (dict['Yellow'] == null ? 0 : dict['Yellow']),
            Black: (dict['Black'] == null ? 0 : dict['Black']),
            White:(dict['White'] == null ? 0 : dict['White']),
            Purple:(dict ['Purple'] == null ? 0 : dict ['Purple']),
            Orange: (dict ['Orange'] == null ? 0 : dict ['Orange']),
            Light_Blue: (dict ['Light_Blue'] == null ? 0 : dict ['Light_Blue']),
            Red:(dict ['Red'] == null ? 0 : dict ['Red']),
            Grey: (dict ['Grey'] == null ? 0 : dict ['Grey']),
            Green: (dict ['Green'] == null ? 0 : dict ['Green']),
            Pink: (dict ['Pink'] == null ? 0 : dict ['Pink']),
            Blue: (dict ['Blue'] == null ? 0 : dict ['Blue']),
            Violet: (dict ['Violet'] == null ? 0 : dict ['Violet']),
            Brown: (dict ['Brown'] == null ? 0 : dict ['Brown']),
            Beige: (dict ['Beige'] == null ? 0 : dict ['Beige'])
          }
        
          dressModel.find({}, function(err, items) {
            if (err) console.log(err);
            // console.log(items);
            objArr = JSON.parse(JSON.stringify(items));
            console.log(typeof objArr);
  
            matchResults = knn(queryImg, objArr, options);
            
            for (var i in matchResults) {
              matchResults[i].percentFloorMatch=calcMatch.calculatePercentageMatch(queryImg, matchResults[i]);
            }

            base64.convertToBase64(matchResults, res);
            console.log(matchResults);
            // console.log(objArr); 
          }); 
        } else if (dict['Fashion_accessory']) { // fashion
          queryImg = {
            // Description: dict["Description"],
            // Store: dict["Store"],
            // imgFileName: dict["imgFileName"],
            Fashion_accessory: (dict ['Fashion_Accessory'] == null ? 0 : dict ['Fashion_Accessory']),
            Bow_Tie: (dict ['Bow_Tie'] == null ? 0 : dict ['Bow_Tie']),
            Black: (dict ['Black'] == null ? 0 : dict ['Black']),
            Tie: (dict ['Tie'] == null ? 0 : dict ['Tie']),
            Formal_Wear: (dict ['Formal_Wear'] == null ? 0 : dict ['Formal_Wear']), 
            Footwear:(dict ['Footwear'] == null ? 0 : dict ['Footwear']),
            Sock: (dict ['Sock'] == null ? 0 : dict ['Sock']),
            Boot: (dict ['Boot'] == null ? 0 : dict ['Boot']),
            Shoe: (dict ['Shoe'] == null ? 0 : dict ['Shoe']),
            Beanie: (dict ['Beanie'] == null ? 0 : dict ['Beanie']),
            Cap: (dict ['Cap'] == null ? 0 : dict ['Cap']),
            Knit_Cap: (dict ['Knit_Cap'] == null ? 0 : dict ['Knit_Cap']),
            Headgear: (dict ['Headgear'] == null ? 0 : dict ['Headgear']),
            Hat: (dict ['Hat'] == null ? 0 : dict ['Hat']),
            Bonnet: (dict ['Bonnet'] == null ? 0 : dict ['Bonnet']),
            Yellow: (dict ['Yellow'] == null ? 0 : dict ['Yellow']),
            Black: (dict ['Black'] == null ? 0 : dict ['Black']),
            White: (dict['White'] == null ? 0 : dict['White']),
            Purple: (dict ['Purple'] == null ? 0 : dict ['Purple']),
            Orange: (dict ['Orange'] == null ? 0 : dict ['Orange']),
            Light_Blue: (dict ['Light_Blue'] == null ? 0 : dict ['Light_Blue']),
            Red: (dict ['Red'] == null ? 0 : dict ['Red']),
            Grey: (dict ['Grey'] == null ? 0 : dict ['Grey']),
            Green: (dict ['Green'] == null ? 0 : dict ['Green']),
            Pink: (dict ['Pink'] == null ? 0 : dict ['Pink']),
            Blue: (dict ['Blue'] == null ? 0 : dict ['Blue']),
            Violet: (dict ['Violet'] == null ? 0 : dict ['Violet']),
            Brown:(dict ['Brown'] == null ? 0 : dict ['Brown']),
            Beige: (dict ['Beige'] == null ? 0 : dict ['Beige'])
          }
        
          fashionAccessModel.find({}, function(err, items) {
            if (err) console.log(err);
            // console.log(items);
            objArr = JSON.parse(JSON.stringify(items));
            console.log(typeof objArr);
  
            matchResults = knn(queryImg, objArr, options);
            
            for (var i in matchResults) {
              matchResults[i].percentFloorMatch=calcMatch.calculatePercentageMatch(queryImg, matchResults[i]);
            }

            base64.convertToBase64(matchResults, res);
            console.log(matchResults);
            // console.log(objArr); 
          }); 
        } else if (dict['Shoe'] || dict['Footwear']) { // shoes
          queryImg = {
            // Description: dict["Description"],
            // Store: dict["Store"],
            // imgFileName: dict["imgFileName"],
            Shoe: (dict['Shoe'] == null ? 0 : dict['Shoe']),
            Footwear: (dict['Footwear'] == null ? 0 : dict['Footwear']),
            Work_Boots: (dict['Work_Boots'] == null ? 0 : dict['Work_Boots']),
            Brown: (dict['Brown'] == null ? 0 : dict['Brown']),
            Tan: (dict['Tan'] == null ? 0 : dict['Tan']),
            Hiking_Boot: (dict['Hiking_Boot'] == null ? 0 : dict['Hiking_Boot']),
            Steeltoe_Boot:(dict['Steeltoe_Boot'] == null ? 0 : dict['Steeltoe_Boot']),
            Beige: (dict['Beige'] == null ? 0 : dict['Beige']),
            Outdoor_Shoe: (dict['Outdoor_Shoe'] == null ? 0 : dict['Outdoor_Shoe']),
            Durango_Boot: (dict['Durango_Boot'] == null ? 0 : dict['Durango_Boot']),
            Snow_Boot: (dict['Snow_Boot'] == null ? 0 : dict['Snow_Boot']),
            Motorcycle_Boot: (dict['Motorcycle_Boot'] == null ? 0 : dict['Motorcycle_Boot']),
            Black: (dict['Black'] == null ? 0 : dict['Black']),
            Sneakers: (dict['Sneakers'] == null ? 0 : dict['Sneakers']),
            Walking_Shoe: (dict['Walking_Shoe'] == null ? 0 : dict['Walking_Shoe']),
            Nike_Free:(dict['Nike_Free'] == null ? 0 : dict['Nike_Free']),
            Plimsoll_Shoe: (dict['Plimsoll_Shoe'] == null ? 0 : dict['Plimsoll_Shoe']),
            Boot: (dict['Boot'] == null ? 0 : dict['Boot']),
            Athletic_Shoe: (dict['Athletic_Shoe'] == null ? 0 : dict['Athletic_Shoe']),
            Skate_Shoe: (dict['Skate_Shoe'] == null ? 0 : dict['Skate_Shoe']),
            Leather: (dict['Leather'] == null ? 0 : dict['Leather']),
            Sportswear:(dict['Sportswear'] == null ? 0 : dict['Sportswear']),
            Suede: (dict['Suede'] == null ? 0 : dict['Suede']),
            Yellow:(dict['Yellow'] == null ? 0 : dict['Yellow']),
            Black:(dict['Black'] == null ? 0 : dict['Black']),
            White: (dict['White'] == null ? 0 : dict['White']),
            Purple:(dict['Purple'] == null ? 0 : dict['Purple']),
            Orange: (dict['Orange'] == null ? 0 : dict['Orange']),
            Light_Blue:(dict['Light_Blue'] == null ? 0 : dict['Light_Blue']),
            Red: (dict['Red'] == null ? 0 : dict['Red']),
            Grey: (dict['Grey'] == null ? 0 : dict['Grey']),
            Green:(dict['Green'] == null ? 0 : dict['Green']),
            Pink:(dict['Pink'] == null ? 0 : dict['Pink']),
            Blue: (dict['Blue'] == null ? 0 : dict['Blue']),
            Violet:(dict['Violet'] == null ? 0 : dict['Violet']),
            Brown:(dict['Brown'] == null ? 0 : dict['Brown'])
          }
        
          shoeModel.find({}, function(err, items) {
            if (err) console.log(err);
            // console.log(items);
            objArr = JSON.parse(JSON.stringify(items));
            console.log(typeof objArr);
  
            matchResults = knn(queryImg, objArr, options);
            
            for (var i in matchResults) {
              matchResults[i].percentFloorMatch=calcMatch.calculatePercentageMatch(queryImg, matchResults[i]);
            }

            base64.convertToBase64(matchResults, res);
            console.log(matchResults);
            // console.log(objArr); 
          }); 
        } else {
          res.send({});
        }

        // Remove search image from the server
        fs.unlink(searchImgPath, (err) => {
          if (err) {
            console.error(err)
            return
          }
          console.log('Search image succesfully deleted...');
          //file removed
        })

      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    } else {
      res.send({Error: "No File Found"});
    }

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });


}