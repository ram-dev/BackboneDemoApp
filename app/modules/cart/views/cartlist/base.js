var _ = require('underscore');
var View = require('baseView');  
var Validator = require('validator');
var ValidatorBootstrap = require('validator/dist/js/framework/bootstrap');

module.exports = View.extend({

  cartFormSetup: function() {

    $('.ch-cart').formValidation({
        live:'disabled',
        fields: {
            "name": {
                validators: {
                    notEmpty: {
                        message: "Name is required"
                    }
                }
            },
            "address": {
                validators: {
                    notEmpty: {
                        message: "Address is required"
                    }
                }
            },
            "city": {
                validators: {
                    notEmpty: {
                        message: "City is required"
                    }
                }
            },
            "state": {
                validators: {
                    notEmpty: {
                        message: "State is required"
                    }
                }
            },
            "zipcode": {
                validators: {
                    notEmpty: {
                        message: "Zipcode is required"
                    }
                }
            },

            
        }
    })

  },

  isCartValid: function(callback) {

      var self = this;

      $('.ch-cart').data('formValidation').validate();
      var valid = $('.ch-cart').data("formValidation").isValid();

      if (valid === null) {
          setTimeout(function() { self.isCartValid(callback); }, 500);
      } else {
          callback(valid);
      }

  }

});
