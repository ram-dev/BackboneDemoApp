(function(el) {

  var _ = require('underscore');
  var View = require('baseView');  
  var Template = require('./templates/dashboard.html!text');
  var Item = require('./templates/productitem.html!text');
  var Store = require('app/utils/session/store');

  module.exports = View.extend({

    events: {
      'click .btn-viewproduct' : 'onViewProduct',
      'click .btn-addcart' : 'addCart'
    },

    subviewCreators : {
        
    },

    onMessages: {
      
    },

    addCart: function(e){
      e.preventDefault();    
      var Id = $(e.target).data('id');
      if(this.model.cart.indexOf(Id) == -1){
        this.model.cart.push(Id); 
      }  
      var len = this.model.cart.length;
      $('#cartList').text(len); 
      Store.set('cartItems', this.model.cart, 1000);          
    },

    onViewProduct : function(e){
      e.preventDefault();
    },


    render: function() {
      var self = this;
      this.model.cart = [];
      self.model.clients.getModel(function(s,m) {
        self.model.clients.attributes = m;
        Store.set('products', m, 1000);
        var Itemtmpl = '';
        if(s){
          $.each(m, function() {
          Itemtmpl += _.template(Item)({ model:this});
          });
          self.$el.html(_.template(Template)({ tmpl:Itemtmpl}));
        }
      });      
      
    },

   

  })

})();
