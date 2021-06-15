import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'receiver.announcements.list',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.receiver'],
  validate: new SimpleSchema({
    latitude: Number,
    longitude: Number,
  }).validator(),
  run: function (data) {

    const oneKm = 0.009 * 3;

    const latitudeUp = data.latitude + oneKm;
    const latitudeDown = data.latitude - oneKm;

    const longitudeUp = data.longitude + oneKm;
    const longitudeDown = data.longitude - oneKm;

    const result = Fetch(Announcements, {
      // 'location.latitude': {
      //   $gte: latitudeDown,
      //   $lte: latitudeUp,
      // },
      // 'location.longitude': {
      //   $gte: longitudeDown,
      //   $lte: longitudeUp,
      // },
      status: 'opened'
    }, null, 'announcements');

    return {
      announcements : result.announcements.map(announcement => {
        announcement.user = Meteor.users.findOne({ _id: announcement.userId })
        return announcement;
      })
    }
  }
});
