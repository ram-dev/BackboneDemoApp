// Asset Controller
(function() {

    "use strict";

    var Settings = require('settings');
    var Backbone = require('backbone');
    var Controller = require('baseController');
    var ShellView = require('./views/shell/view');

    module.exports = Controller.extend({

        do: function(method) {
            this[method]();
        },

        shell: function() {
            this.viewFactory(ShellView, 'dashboard', Settings.CONTENT_NODE);
        }

    });

})();
