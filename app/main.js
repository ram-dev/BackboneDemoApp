(function() {

  'use strict';

  require('bootstrap');
  require('bootstrap/css/bootstrap.css!');
  require('bootstrap/css/bootstrap-theme.css!');
  require('../styles/app.css!');

  var Backbone = require('backbone');
  var Router = require('./router');

  window.app = new Router();
  Backbone.history.start();

})();
