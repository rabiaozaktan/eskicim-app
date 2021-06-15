import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'receiver.announcements.closed',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.receiver'],
  validate: new SimpleSchema({
    id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    const { id } = data;

    const announcement = Announcements.findOne({ _id: id });
    const receiverUserId = Meteor.userId()

    const channelId = Channels.insert({
      userIds: [announcement.userId, receiverUserId]
    });

    Announcements.update({ _id: id }, {
      $set: {
        status: 'closed',
        receiverUserId: receiverUserId,
        channelId: channelId
      }
    });
  }
});
