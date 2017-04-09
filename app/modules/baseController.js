// Controller
(function() {

  "use strict";

  var Backbone = require('backbone');
  var Controller = require('controller');

  module.exports = Controller.extend({

    initialize: function() {
      this.views = {};
      this.models = {};
    },

    viewFactory: function(view, name, el, model) {

      if (!this.views.hasOwnProperty(name)) {
        this.views[name] = new view({
          el: el,
          model: model
        });
      }

      this.views[name].render();

    }

  });

})();
