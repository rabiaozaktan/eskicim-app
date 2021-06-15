import SimpleSchema from 'simpl-schema';

Announcements = new Mongo.Collection('announcements');

AnnouncementSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  receiverUserId: { type: SimpleSchema.RegEx.Id, optional: true },
  location: { type: Object, blackbox: true },
  images: Array,
  'images.$': {
    type: String,
    blackbox: true
  },
  descriptions: { type: String, optional: true },
  channelId: { type: SimpleSchema.RegEx.Id, optional: true },

  status: {
    type: String,
    allowedValues: ['opened', 'closed', 'canceled', 'expired', 'sold']
  }
});

Announcements.attachSchema(AnnouncementSchema);
Announcements.softRemovable();
Announcements.autoDates();