// Asset Controller
(function() {

  "use strict";

  var Settings = require('settings');
  var Backbone = require('backbone');
  var Controller = require('baseController');
  var DashboardView = require('./views/dashboard/view');
  var DashboardModel = require('./models/dashboard');
  

  module.exports = Controller.extend({

    do: function(method) {
        this[method]();
    },

    dashboard: function() {
      this.viewFactory(DashboardView, 'dashboard', Settings.PAGE_NODE, {
        clients: new DashboardModel({ url: Settings.API_SERVER })        
      });
    }

  });

})();
