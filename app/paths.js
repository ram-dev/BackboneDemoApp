var setup = setup || (function() {

  var paths = [

    { name: "accountController", value: "app/modules/account/controller" },
    { name: "baseController", value:  "app/modules/baseController" },
    { name: "baseModel", value:  "app/modules/baseModel" },
    { name: "baseView", value:  "app/modules/baseView" },
    { name: "dashboardController", value: "app/modules/dashboard/controller" },
    { name: "shellController", value: "app/modules/shell/controller" },
    { name: "session", value: "app/utils/session/store" },
    { name: "settings", value: "app/settings" },
    { name: "cartController", value: "app/modules/cart/controller" },
    //{ name: "vocab", value: "app/utils/vocab/setup" }

  ];

  return {

    init: function () {
      Object.keys(paths).forEach(function (key) {
        System.map[paths[key].name] = paths[key].value;
      });
    },

    collect: function () {
      var locals = {};
      Object.keys(paths).forEach(function (key) {
        locals[paths[key].name] = paths[key].value;
      });
      return locals;
    }

  }

})();