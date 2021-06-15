new ValidatedMethod({
  name: 'auth.resendVerification',
  mixins: [SignedInMixin],
  validate: function () { },
  run: function () {
    Accounts.sendVerificationEmail(Meteor.userId());
  }
});
