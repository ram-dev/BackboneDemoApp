(function(el) {

  var _ = require('underscore');
  var Store = require('session');
  var Base = require('./base');
  var Template = require('./templates/cart.html!text');
  var SerializeObject = require('app/utils/jquery/serializeObject');

  module.exports = Base.extend({

    events: {
      'click .btn-order' : 'onSubmit'      
    },

    subviewCreators : {},

    onMessages: {},

    render: function(message) {
      var self = this;
      this.$el.html(_.template(Template)({ message: message }));
      this.cartFormSetup();
    },
    
    onSubmit: function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var self = this;
      this.isCartValid(function(valid) {
        if(valid){
          var shipingDetails = $("form[name=ch-cart]").serializeObject();          
          Store.set('shipingDetails', shipingDetails, 300);
          app.navigate('order', true);
        }

      })
      
    }

  })

})();
