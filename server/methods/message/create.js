import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.create',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    message: MessageSchema
  }).validator(),
  run: function (data) {
    const { message } = data;

    Messages.insert(message);
  }
});
