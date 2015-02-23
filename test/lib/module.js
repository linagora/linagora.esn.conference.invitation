'use strict';

var expect = require('chai').expect;

describe('The om-invitation module', function() {

  beforeEach(function() {
    this.depStore = {
      logger: require('./logger')
    };
    var self = this;
    this.dependencies = function(name) {
      return self.depStore[name];
    };
  });

  describe('the registerInvitationSender function ', function() {
    it('should not register if type is not defined', function() {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.registerInvitationSender(null, function() {});
      expect(invitation.invitationSenders).to.deep.equal({});
    });

    it('should not register if sender is not defined', function() {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.registerInvitationSender('type', null);
      expect(invitation.invitationSenders.type).to.not.exist;
    });

    it('should register a sender for the invitation type', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.registerInvitationSender('type', done);
      expect(invitation.invitationSenders.type).to.exist;
      invitation.invitationSenders.type();
    });
  });

  describe('the sendInvitation function ', function() {
    it('should throw if from is not defined', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.sendInvitation(null, {objectType: 'user', id: 'gerard@pipo.com'}, {_id: '123'}, 'type', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should throw if to is not defined', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.sendInvitation({objectType: 'user', id: 'gerard@pipo.com'}, null, {_id: '123'}, 'type', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should throw if conference is not defined', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.sendInvitation({objectType: 'user', id: 'gerard@pipo.com'}, {objectType: 'user', id: 'robert@pipo.com'}, null, 'type', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should throw if invitationType is not defined', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.sendInvitation({objectType: 'user', id: 'gerard@pipo.com'}, {objectType: 'user', id: 'robert@pipo.com'}, {_id: '123'}, null, function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should throw if no sender is registered for invitationType', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);
      invitation.sendInvitation({objectType: 'user', id: 'gerard@pipo.com'}, {objectType: 'user', id: 'robert@pipo.com'}, {_id: '123'}, 'type', function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should call associated sender', function(done) {
      var invitation = require('../../lib/module')(this.dependencies);

      var to = {objectType: 'user', id: 'gerard@pipo.com'};
      var from = {objectType: 'user', id: 'robert@pipo.com'};
      var conference = {_id: '123'};
      var invitationType = 'type';

      invitation.invitationSenders[invitationType] = {
        sendInvitation: function(from, to, conference, callback) {
          expect(from).to.deep.equal(from);
          expect(to).to.deep.equal(to);
          expect(conference).to.deep.equal(conference);
          return callback();
        }
      };
      invitation.sendInvitation(from, to, conference, invitationType, done);
    });

  });

});
