import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'customer.announcements.list',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.customer'],
  validate: new SimpleSchema({
    options: { type: Object, optional: true, blackbox: true }
  }).validator(),
  run: function (data) {
    const result = Fetch(Announcements, {}, data.options, 'announcements');

    result.announcements = result.announcements.map(announcement => {
      announcement.receiverUser = Meteor.users.findOne({ _id: announcement.receiverUserId });
      return announcement
    })
    return result;
  }
});
