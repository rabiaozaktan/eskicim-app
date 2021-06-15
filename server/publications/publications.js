Meteor.publish('messages', function (channelId) {
  return Messages.find({channelId: channelId});
});