(function() {

  var settings = {};

  settings.API_SERVER = 'http://localhost:3000/api/';
  settings.PRODUCTS =  settings.API_SERVER + 'porducts.json';
  settings.NAVIGATION_NODE = '#navigation';
  settings.ACCOUNT_NODE = '#account';
  settings.PAGE_NODE = '#page';
  settings.CONTENT_NODE = '#content';
  settings.REGISTER_NODE = '.login-form';
  settings.PAGE_NODE ='#page';

  module.exports = settings;

})();
