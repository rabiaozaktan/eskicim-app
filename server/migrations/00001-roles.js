Migrations.add({
  version: 1,
  name: 'Roller tanimlaniyor: roles',
  up: function () {
    Roles.createRole('roles.admin');
    Roles.createRole('roles.customer');
    Roles.createRole('roles.receiver');
  }
  
});