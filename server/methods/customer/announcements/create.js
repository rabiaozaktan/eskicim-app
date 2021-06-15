import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'customer.announcements.create',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.customer'],
  validate: new SimpleSchema({
    descriptions: { type: String, optional: true },
    location: { type: Object, blackbox: true },
    images: Array,
    'images.$': {
      type: String,
    },
  }).validator(),
  run: function (data) {

    Announcements.insert({
      userId: Meteor.userId(),
      location: data.location,
      images: data.images,
      status: 'opened',
      descriptions: data.descriptions,
    });
  }
});
