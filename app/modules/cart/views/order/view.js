(function(el) {

  var _ = require('underscore');  
  var View = require('baseView');
  var Template = require('./templates/order.html!text');
  var Item = require('./templates/item.html!text');
  var Store = require('session');

  module.exports = View.extend({

    events: {
          
    },

    subviewCreators : {},

    onMessages: {},

    render: function(message) {
      var self = this;
      var cartItems  = Store.get('cartItems');
      var products = Store.get('products');
      var cartProduct = [];   
      var total  = 0;       
      $.each(products, function(){
        if(cartItems.indexOf(this.id) != -1){
          cartProduct.push(this);
          total += this.price;
        }
      });
      var Itemtmpl = '';
      var count  = 0;
      $.each(cartProduct, function() {
        count++;
        Itemtmpl += _.template(Item)({ model:this, count : count});
      });      
      var sd = Store.get('shipingDetails');
      this.$el.html(_.template(Template)({ message: message, sd : sd, tmpl:Itemtmpl, total: total }));      
    }     

  })

})();
