export const name = 'create-user';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2'
}, 'bordo:create-user');

const SimpleSchema = require('simpl-schema');
SimpleSchema.extendOptions(['denyUpdate']);

const _schema = new SimpleSchema({
  createdUserId: {
    type: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (Meteor.userId()) {
        return Meteor.userId()
      }
    },
    optional: true
  }
});

Mongo.Collection.prototype.createdUser = function () {
  const collection = this;
  collection.attachSchema(_schema);
};
