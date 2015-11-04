'use strict';

/**
 *
 * @param {hash} dependencies
 * @return {*}
 */
module.exports = function(dependencies) {
  var logger = dependencies('logger');

  var lib = {};
  var senders = {};

  lib.sendInvitation = function(from, to, conference, baseUrl, invitationType, callback) {
    if (!conference) {
      return callback(new Error('Conference is required to send an invitation.'));
    }
    if (!from || !to) {
      return callback(new Error('Invitation target and user are needed.'));
    }
    if (!invitationType || !senders[invitationType]) {
      return callback(new Error('Could not find invitation sender for type ' + invitationType));
    }
    var sender = senders[invitationType];
    sender.sendInvitation(from, to, conference, baseUrl, callback);
  };

  lib.registerInvitationSender = function(type, sender) {
    if (!type || !sender) {
      logger.error('Could not register invitation sender for type %s.', type);
      return;
    }
    senders[type] = sender;
  };

  lib.invitationSenders = senders;

  return lib;
};
