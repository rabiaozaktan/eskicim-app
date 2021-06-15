import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'receiver.announcements.listByOwner',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.receiver'],
  validate: new SimpleSchema({
    options: { type: Object, optional: true, blackbox: true }
  }).validator(),
  run: function (data) {

    const result = Fetch(Announcements, { receiverUserId: Meteor.userId() }, null, 'announcements');

    result.announcements = result.announcements.map(announcement => {
      announcement.user = Meteor.users.findOne({ _id: announcement.userId })
      return announcement;
    })

    return result
  }
});
