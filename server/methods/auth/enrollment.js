new ValidatedMethod({
  name: 'auth.enrollment',
  mixins: [SignedInMixin],
  validate: function () { },
  run: function () {
    Accounts.sendEnrollmentEmail(Meteor.userId());
  }
});

new ValidatedMethod({
  name: 'auth.addRole',
  mixins: [SignedInMixin],
  validate: function () { },
  run: function () {
    Roles.addUsersToRoles(Meteor.userId(), 'roles.customer');
  }
});