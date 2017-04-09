(function() {

  var Backbone = require('backbone');

  module.exports = Backbone.Model.extend({

    initialize: function(options) {
      this.url = (options.url != undefined)? options.url : null;
    },

    frag: function(args) {
        var f = "";
        for (var c = 0; c < args.length; c++) {
            f += args[c] + "/";
        }
        return f.substring(0, f.length - 1);
    },

    params: function(args){
        return $.param(args);
    },

    restify: function(args) {
        var f = "";
        $.each(args, function(k,v) {
            f += v + "/";
        });
        return f.substring(0, f.length - 1);
    },

    postXHR: function(args, progress, callback) {

        var xhr = new XMLHttpRequest();


        xhr.open('POST', this.url);

        if (app.user.access_token !== undefined) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + app.user.access_token);
        }


        // xhr.onload = function() {
        //   progress.value = progress.innerHTML = 100;
        // };

        // xhr.upload.onprogress = function (event) {
        //     if (event.lengthComputable) {
        //         var complete = (event.loaded / event.total * 100 | 0);
        //         progress.value = progress.innerHTML = complete;
        //     }
        // }

        // xhr.upload.addEventListener('loadstart', function(e) {
        //   // When the request starts.
        // });
        // xhr.upload.addEventListener('progress', function(e) {
        //   // While sending and loading data.
        // });
        // xhr.upload.addEventListener('load', function(e) {
        //   // When the request has *successfully* completed.
        //   // Even if the server hasn't responded that it finished.
        // });
        // xhr.upload.addEventListener('loadend', function(e) {
        //   // When the request has completed (either in success or failure).
        //   // Just like 'load', even if the server hasn't
        //   // responded that it finished processing the request.
        // });
        // xhr.upload.addEventListener('error', function(e) {
        //   // When the request has failed.
        // });
        // xhr.upload.addEventListener('abort', function(e) {
        //   // When the request has been aborted.
        //   // For instance, by invoking the abort() method.
        // });
        // xhr.upload.addEventListener('timeout', function(e) {
        //   // When the author specified timeout has passed
        //   // before the request could complete.
        // });

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                progress(complete);
            }
        }

        xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
                if (this.status === 200) {
                    callback(true, $.parseJSON(this.response));
                } else {
                    callback(false, this.response);
                }
            }
        });


        xhr.send(args);

    },

    postForm: function(args, callback) {


        $.ajax({
            url: this.url,
            type: "POST",
            data: args,
            success: function (data) {
                callback(true, data);
            },
            error: function (data) {
                callback(false, data);
            }
        });

    },

    postModel: function(payload, callback) {

        this.save({ request: payload }, {

            success: function(model, data, options) {
                if (data.StatusCode === 200) {
                    if (data.Result.Success) {
                        callback(true, data.Result);
                    } else {
                        callback(false, data.Result);
                    }
                } else {
                    // API level error
                    // should probably call app error here
                    debugger;
                    callback(false, data.Result);
                }
            },
            // AJAX level error
            error: function(model, data, options) {
                app.trigger("error", Config.ERR_API);
            }

        });

    },

    getModel: function(callback) {

        this.fetch().done(function(obj) {
            if (obj.StatusCode === 200) {
                if (obj.Result != null) {
                    callback(true, obj.Result);
                } else {
                    callback(false, obj.Result);
                }
            } else {
                app.trigger("error", Config.ERR_API);
            }
        });

    },

    putModel: function(payload, callback) {

        var xhr = new XMLHttpRequest();

        xhr.open('PUT', this.url);

        if (app.user.access_token !== undefined) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + app.user.access_token);
        }

        xhr.setRequestHeader('Content-Type','application/json');
        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

        xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
                if (this.status === 200) {
                    callback(true, $.parseJSON(this.response).Result);
                } else {
                    callback(false, this.response);
                }
            }
        });

        xhr.send(JSON.stringify({ request: payload}));

    },

    deleteModel: function(callback) {

        var xhr = new XMLHttpRequest();

        xhr.open('DELETE', this.url);

        if (app.user.access_token !== undefined) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + app.user.access_token);
        }

        xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
                if (this.status === 200) {
                    callback(true, $.parseJSON(this.response).Result);
                } else {
                    callback(false, this.response);
                }
            }
        });

        xhr.send();

    }

  })

})();
