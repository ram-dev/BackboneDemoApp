// Asset Controller
(function() {

  "use strict";

  var Settings = require('settings');
  var Backbone = require('backbone');
  var Controller = require('baseController');
  var CartView = require('./views/cartList/view');
  var OrderView =  require('./views/order/view');
  
  module.exports = Controller.extend({

    do: function(method) {
        this[method]();
    },

    cart: function() {
      this.viewFactory(CartView, 'cart', Settings.PAGE_NODE);
    },

    order: function() {
      this.viewFactory(OrderView, 'order', Settings.PAGE_NODE);
    }

    
  });

})();
