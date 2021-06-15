import SimpleSchema from 'simpl-schema';

Messages = new Mongo.Collection('messages');

MessageSchema = new SimpleSchema({
  channelId: SimpleSchema.RegEx.Id,

  sendUserId: SimpleSchema.RegEx.Id,

  message: String,
});

Messages.attachSchema(MessageSchema);
Messages.softRemovable();
Messages.autoDates();