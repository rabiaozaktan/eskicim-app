import SimpleSchema from 'simpl-schema';

Channels = new Mongo.Collection('channels');

ChannelSchema = new SimpleSchema({
  userIds: {
    type: Array,
    optional: true
  },

  'userIds.$': {
    type: SimpleSchema.RegEx.Id,
    blackbox: true
  },
});

Channels.attachSchema(ChannelSchema);
Channels.softRemovable();
Channels.autoDates();