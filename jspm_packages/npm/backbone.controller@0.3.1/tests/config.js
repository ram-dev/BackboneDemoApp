/* */ 
(function(process) {
  module.exports = function(config) {
    config.set({
      basePath: '../',
      frameworks: ['mocha'],
      files: ['tests/vendor/sinon.js', 'tests/vendor/chai.js', 'tests/vendor/jquery.js', 'tests/vendor/underscore.js', 'tests/vendor/backbone.js', 'tests/vendor/Q.js', 'backbone.controller.js', 'tests/spec/*.js'],
      exclude: [],
      client: {mocha: {ui: 'bdd'}},
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
      captureTimeout: 20000,
      singleRun: false,
      reportSlowerThan: 500,
      plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher']
    });
  };
})(require("process"));
