'use strict';

module.exports = function(app) {
  var cors = require('cors');

  // CORS Options
  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  // multer configuration
  var multer  = require('multer');
  var upload = multer({ dest: 'tmpUploads/' });


  var multer  = require('multer');
  // SET STORAGE
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'.png')
    }
  });

  var upload = multer({ storage: storage });

  app.post('/api/thrifter/uploadfile', upload.single('files'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
  });
  
  //MULTER CONFIG: to get file photos to temp server storage
  const multerConfig = {
      
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/photo-storage');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.'+ext);
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              console.log('photo uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };
  
  var fashionController = require('../controllers/fashionController');
  
  

  
  // base url
  app.route('/')
    .get(fashionController.getBase);
  // **********************************************
  // Thrifter api endpoints

  app.route('/api/thrifter')
    .post(fashionController.postItem);

  app.route('/api/thrifter')  
    .get(fashionController.getAll);

  app.route('/api/thrifter/getMatch', multer(multerConfig).single('photo'))
    .post(fashionController.getMatching);







};


