Template.registerHelper('state', function () {
  return Template.instance().state;
});

Template.registerHelper('st', function (key) {
  return Template.instance()[key];
});