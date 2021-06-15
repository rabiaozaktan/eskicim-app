import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'customer.announcements.show',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.customer'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    return Announcements.findOne({ _id: data._id });
  }
});
