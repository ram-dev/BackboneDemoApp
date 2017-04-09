(function() {

  var Store = require('store');

  var storeWithExpiration = {
    set: function(key, val, exp) {
        Store.set(key, { val:val, exp:exp, time:new Date().getTime() })
    },
    get: function(key) {
        var info = Store.get(key)
        if (!info) { return null }
        if (new Date().getTime() - info.time > (info.exp * 10000)) { return null }
        return info.val
    }
  }

  module.exports = storeWithExpiration;

})();
