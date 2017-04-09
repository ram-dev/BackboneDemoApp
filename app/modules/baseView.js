(function() {

  var Settings = require('../settings');
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Subview = require('subviews');
  var Courier = require('courier');

  module.exports = Backbone.View.extend({

    initialize: function() {
      this.settings = Settings;
      Backbone.Subviews.add( this );
      Backbone.Courier.add( this );
    },

    setup: function(options) {
      console.log(options.handle + " is loaded");
      this.vm = options.vm;
      return this;
    }

  })

})();
