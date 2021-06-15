Migrations.add({
  version: 2,
  name: 'Admin user oluşturuluyor.',
  up: function () {

    try {
      const userId = Accounts.createUser({
        email: 'admin@admin.com',
        password: '123',
        profile: {
          firstname: 'Admin',
          lastname: 'Admin',
          phone: '0000000',
          type: 'admin'
        }
      });

      Meteor.users.update({ _id: userId }, {
        $set: {
          'profile.isAdmin': true,
        }
      })

      Roles.addUsersToRoles(userId, 'roles.admin', null);

    } catch (error) {
      console.log(error);
    }
  }
});