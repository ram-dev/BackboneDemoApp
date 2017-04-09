(function(el) {

    var _ = require('underscore');
    var View = require('baseView');
    var Store = require('app/utils/session/store');
    var Template = require('./templates/shell.html!text');

    module.exports = View.extend({

        subviewCreators : {

        },

        onMessages: {

        },

        render: function() {
            var self = this;
            this.$el.html(_.template(Template))
            var cartItems  =Store.get('cartItems'); 
            $('#cartList').text(cartItems.length); 
            
        },


    })

})();
