import { UserStatus } from 'meteor/mizzao:user-status';

Accounts.onCreateUser(function (options, user) {
  user.profile = options.profile || {};
  user.profile.isAdmin = false;

  if (options.profile.type == 'receiver') {
    Roles.addUsersToRoles(user._id, 'roles.receiver', null);
  }

  if (options.profile.type == 'customer') {
    Roles.addUsersToRoles(user._id, 'roles.customer', null);
  }

  return user;
});


UserStatus.events.on('connectionLogin', function (fields) {
  fields.type = 'login';
  UserStatusLogs.insert(fields);
});

Accounts.emailTemplates.siteName = 'eskicim.com';
Accounts.emailTemplates.from = Meteor?.settings?.email?.from || '';