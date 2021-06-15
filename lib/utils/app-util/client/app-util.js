AppUtil = {
  temp: new ReactiveDict(),
  refreshTokens: new ReactiveDict()
};

Template.registerHelper('appUtil', function(a) {
  return AppUtil;
});