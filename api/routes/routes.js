'use strict';

module.exports = function(app) {
  var cors = require('cors');

  // CORS Options
  var corsOptions = {
    origin: 'http://localhost:19001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
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






};


