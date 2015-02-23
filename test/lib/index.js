'use strict';

var expect = require('chai').expect;

describe('The om-invitation awesome module', function() {
  it('should provide a lib state', function() {
    var module = require('../../lib/index');
    expect(module.settings.states.lib).to.exist;
    expect(module.settings.states.lib).to.be.a('function');
  });
});

