(function() {

    'use strict';


    var Settings = require('settings');


    module.exports = Backbone.Router.extend({

        initialize: function() {            
            this.session = undefined;
            this.views = {};
            this.models = {};
            this.controllers = {};
            //this.registerListeners();

            // ------------------------------------------------------------------------------------------
            // Ajax
            // ------------------------------------------------------------------------------------------

            $.ajaxSetup({
                crossDomain: true,
                timeout: 10000,
                retryWait: 200,
                retryLimit: 0,
                showSpinner: true
            });

            // ------------------------------------------------------------------------------------------
            // Prefilter
            // ------------------------------------------------------------------------------------------

            $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {

                originalOptions.retryLimit = (originalOptions.retryLimit === undefined) ? options.retryLimit : originalOptions.retryLimit;
                originalOptions.retryWait = (originalOptions.retryWait === undefined) ? options.retryWait : originalOptions.retryWait;

                options.beforeSend = function (xhr) {

                    jqXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    // jqXHR.setRequestHeader('Access-Control-Expose-Headers', 'Token')

                    if (app.user.access_token !== undefined) {
                        jqXHR.setRequestHeader('Authorization', 'Bearer ' + app.user.access_token);
                    }
                };

                options.complete = function() {

                };

                options.xhrFields = {
                    withCredentials: true
                };

                options.error = $.noop();

                var dfd = $.Deferred();

                jqXHR.done(dfd.resolve);

                jqXHR.fail(function() {

                    if (originalOptions.retryLimit > 1) {
                        setTimeout(function(){
                            originalOptions.retryLimit --;
                            $.ajax(originalOptions).then(dfd.resolve, dfd.reject);
                        }, originalOptions.retryWait);
                    } else {
                        dfd.fail(originalOptions._error);
                        dfd.rejectWith( this, arguments );
                        window.app.trigger("meltdown", "Sorry, the service is suffering a meltdown.");
                    }

                });

                return dfd.promise(jqXHR);

            });
        },

        error: function(err) {
            console.log(err);
        },

        controllerFactory: function(name, ctrl, method) {

            var self = this;

            if (!this.controllers.hasOwnProperty(name)) {
                ctrl.get().then(function(Controller) {
                    self.controllers[name] = new Controller();
                    self.controllers[name].init().setup().events().control(method);
                });
            } else {
                this.controllers[name].control();
            }

        }

    });

})();
