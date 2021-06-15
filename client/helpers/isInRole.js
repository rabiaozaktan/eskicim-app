Template.registerHelper('_isInRole', function (userId, role) {
  const group = Roles.GLOBAL_GROUP;
  return Roles.userIsInRole(userId, [role], group);
});

