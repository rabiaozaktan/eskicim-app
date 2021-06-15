Template.registerHelper('formatDateTime', function (a) {
  return a ? moment(a).format('DD/MM/YYYY - HH:mm:ss') : "~";
});

Template.registerHelper('formatDate', function (a) {
  return a ? moment(a).format('DD/MM/YYYY') : "~";
});

Template.registerHelper('formatDateShort', function (a) {
  return a ? moment(a).format('DD/MM - HH:mm') : "~";
});

Template.registerHelper('formatDateShortsn', function (a) {
  return a ? moment(a).format('DD/MM - HH:mm:ss') : "~";
});

Template.registerHelper('formatDateMount', function (a) {
  return a ? moment(a).format('MMMM DD, YYYY') : "~";
});


Template.registerHelper('formatDateInput', function (a) {
  return a ? moment(a).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
});