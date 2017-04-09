(function() {

  var Model = require('../../baseModel');

  module.exports = Model.extend({

    getModel: function(callback) {

      callback(true, [
        	{ id: 1, name: 'Product 1', price : 50, color: 'Red, Blue' },
        	{ id: 2, name: 'Product 2', price : 30, color: 'Blue' },
        	{ id: 3, name: 'Product 3', price : 40, color: 'Yellow, Blue' },
        	{ id: 4, name: 'Product 4', price : 34, color: 'Red, Green' },
        	{ id: 5, name: 'Product 5', price : 20, color: 'Red' },
        	{ id: 6, name: 'Product 6', price : 85, color: 'Green' },
        	{ id: 7, name: 'Product 7', price : 40, color: 'Yello' }
        ]
      );

    }

  })

})();
