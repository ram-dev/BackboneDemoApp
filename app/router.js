(function() {

  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var Settings = require('settings');
  var Store = require('session');   
  var Dashboard = require('dashboardController');
  var Cart = require('cartController');
  var Shell = require('shellController');

  module.exports = Backbone.Router.extend({

    initialize: function() {     
      this.controllers = {};
    },

    routes: {      
      '' : 'dashboardLoad', 
      'products': 'dashboardLoad',
      'cart': 'cartLoad', 
      'order':'orderLoad',
      '*notFound': 'notFound'
    },

    dashboardLoad:function(){
      this.controllerFactory('shell', Shell, 'shell');
      this.controllerFactory('dashboard', Dashboard, 'dashboard');
    },

    cartLoad : function(){
      this.controllerFactory('shell', Shell, 'shell');
      this.controllerFactory('cart', Cart, 'cart');
    },

    orderLoad : function(){
      this.controllerFactory('shell', Shell, 'shell');
      this.controllerFactory('cart', Cart, 'order');
    },

    notFound: function(route) {
      debugger;
    },
    controllerFactory: function(name, ctrl, action) {
      var self = this;     
      if (!self.controllers.hasOwnProperty(name)) {
        if (typeof ctrl === 'string') ctrl = eval(ctrl[0].toUpperCase() + ctrl.slice(1));
        self.controllers[name] = new ctrl({router: this});
      }
      if (action != undefined) {
        this.controllers[name].do(action);
      }

    }

  });

})();
