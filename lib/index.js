'use strict';

var AwesomeModule = require('awesome-module');
var Dependency = AwesomeModule.AwesomeModuleDependency;

var PREFIX = 'linagora.io.';

var invitationModule = new AwesomeModule(PREFIX + 'invitation', {
  dependencies: [
    new Dependency(Dependency.TYPE_ABILITY, 'logger', 'logger')
  ],

  states: {
    lib: function(dependencies, callback) {
      var lib = require('./module')(dependencies);
      return callback(null, lib);
    }
  }
});

/**
 *
 * @type {AwesomeModule}
 */
module.exports = invitationModule;
